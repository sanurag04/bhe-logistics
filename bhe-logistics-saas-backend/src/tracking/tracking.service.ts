import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingEvent, TrackingStatus } from './tracking-event.entity';
import { Shipment, ShipmentStatus } from '../shipment/shipment.entity';
import type {
  CarrierAdapterService,
  TrackingRequest,
  TrackingEvent as CarrierTrackingEvent,
} from '../carrier/carrier-adapter.interface';
import {
  NotFoundException,
  ServiceUnavailableException,
} from '../common/exceptions/business.exceptions';

@Injectable()
export class TrackingService {
  private readonly logger = new Logger(TrackingService.name);

  constructor(
    @InjectRepository(TrackingEvent)
    private trackingEventRepository: Repository<TrackingEvent>,
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @Inject('CarrierAdapterService')
    private carrierAdapterService: CarrierAdapterService,
  ) {}

  async syncShipmentTracking(shipmentId: string): Promise<void> {
    try {
      this.logger.debug(`Syncing tracking for shipment ${shipmentId}`);

      const shipment = await this.shipmentRepository.findOne({
        where: { id: shipmentId },
      });

      if (!shipment) {
        this.logger.warn(`Shipment with ID ${shipmentId} not found`);
        throw new NotFoundException('Shipment', shipmentId);
      }

      if (!shipment.trackingNumber) {
        this.logger.warn(`Shipment ${shipmentId} has no tracking number`);
        return;
      }

      // Get tracking data from carrier
      const trackingRequest: TrackingRequest = {
        carrier: shipment.carrier,
        trackingNumber: shipment.trackingNumber,
      };

      this.logger.debug(
        `Fetching tracking data from ${shipment.carrier} for ${shipment.trackingNumber}`,
      );
      const trackingResponse =
        await this.carrierAdapterService.trackShipment(trackingRequest);

      // Update shipment status if it has changed
      const newStatus = this.mapTrackingStatusToShipmentStatus(
        trackingResponse.status,
      );
      if (shipment.status !== newStatus) {
        shipment.status = newStatus;
        await this.shipmentRepository.save(shipment);
        this.logger.log(
          `Updated shipment ${shipmentId} status to ${newStatus}`,
        );
      }

      // Store new tracking events
      await this.storeTrackingEvents(shipmentId, trackingResponse.events);

      this.logger.log(
        `Successfully synced tracking for shipment ${shipmentId}`,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to sync tracking for shipment ${shipmentId}: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        `Tracking sync failed for shipment ${shipmentId}. Please try again later.`,
      );
    }
  }

  async syncAllActiveShipments(): Promise<void> {
    try {
      this.logger.log('Starting sync of all active shipments');

      const activeShipments = await this.shipmentRepository.find({
        where: [
          { status: ShipmentStatus.BOOKED },
          { status: ShipmentStatus.IN_TRANSIT },
        ],
      });

      this.logger.log(
        `Found ${activeShipments.length} active shipments to sync`,
      );

      if (activeShipments.length === 0) {
        this.logger.log('No active shipments to sync');
        return;
      }

      const syncPromises = activeShipments.map((shipment) =>
        this.syncShipmentTracking(shipment.id).catch((error) => {
          this.logger.error(
            `Failed to sync shipment ${shipment.id}: ${error.message}`,
          );
          // Don't fail the entire batch for individual shipment errors
        }),
      );

      const results = await Promise.allSettled(syncPromises);
      const successful = results.filter(
        (result) => result.status === 'fulfilled',
      ).length;
      const failed = results.filter(
        (result) => result.status === 'rejected',
      ).length;

      this.logger.log(
        `Tracking sync completed: ${successful} successful, ${failed} failed`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to sync all active shipments: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        'Failed to sync tracking for active shipments. Please try again later.',
      );
    }
  }

  async getTrackingEvents(shipmentId: string): Promise<TrackingEvent[]> {
    try {
      this.logger.debug(`Getting tracking events for shipment ${shipmentId}`);
      const events = await this.trackingEventRepository.find({
        where: { shipmentId },
        order: { timestamp: 'ASC' },
      });
      this.logger.log(
        `Found ${events.length} tracking events for shipment ${shipmentId}`,
      );
      return events;
    } catch (error) {
      this.logger.error(
        `Failed to get tracking events for shipment ${shipmentId}: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        'Failed to retrieve tracking events. Please try again later.',
      );
    }
  }

  private async storeTrackingEvents(
    shipmentId: string,
    events: CarrierTrackingEvent[],
  ): Promise<void> {
    try {
      this.logger.debug(`Storing tracking events for shipment ${shipmentId}`);

      const existingEvents = await this.trackingEventRepository.find({
        where: { shipmentId },
        select: ['timestamp', 'status', 'location', 'description'],
      });

      const existingEventKeys = new Set(
        existingEvents.map(
          (event) =>
            `${event.timestamp.getTime()}-${event.status}-${event.location}-${event.description}`,
        ),
      );

      const newEvents = events
        .filter((event) => {
          const eventKey = `${event.timestamp.getTime()}-${event.status}-${event.location}-${event.description}`;
          return !existingEventKeys.has(eventKey);
        })
        .map((event) => ({
          shipmentId,
          status: this.mapCarrierStatusToTrackingStatus(event.status),
          location: event.location,
          description: event.description,
          timestamp: event.timestamp,
          rawData: event,
        }));

      if (newEvents.length > 0) {
        await this.trackingEventRepository.save(newEvents);
        this.logger.log(
          `Stored ${newEvents.length} new tracking events for shipment ${shipmentId}`,
        );
      } else {
        this.logger.debug(
          `No new tracking events to store for shipment ${shipmentId}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to store tracking events for shipment ${shipmentId}: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        `Failed to store tracking events for shipment ${shipmentId}. Please try again later.`,
      );
    }
  }

  private mapTrackingStatusToShipmentStatus(
    trackingStatus: string,
  ): ShipmentStatus {
    switch (trackingStatus.toUpperCase()) {
      case 'DELIVERED':
        return ShipmentStatus.DELIVERED;
      case 'IN_TRANSIT':
      case 'OUT_FOR_DELIVERY':
        return ShipmentStatus.IN_TRANSIT;
      case 'BOOKED':
      case 'PICKED_UP':
      default:
        return ShipmentStatus.BOOKED;
    }
  }

  private mapCarrierStatusToTrackingStatus(
    carrierStatus: string,
  ): TrackingStatus {
    const statusMap: Record<string, TrackingStatus> = {
      PICKED_UP: TrackingStatus.PICKED_UP,
      IN_TRANSIT: TrackingStatus.IN_TRANSIT,
      OUT_FOR_DELIVERY: TrackingStatus.OUT_FOR_DELIVERY,
      DELIVERED: TrackingStatus.DELIVERED,
      EXCEPTION: TrackingStatus.EXCEPTION,
      RETURNED: TrackingStatus.RETURNED,
    };

    return statusMap[carrierStatus.toUpperCase()] || TrackingStatus.IN_TRANSIT;
  }
}
