import { Injectable } from '@nestjs/common';
import {
  CarrierAdapterService,
  BookingRequest,
  NormalizedBookingResponse,
  TrackingRequest,
  NormalizedTrackingResponse,
} from './carrier-adapter.interface';

@Injectable()
export abstract class BaseCarrierAdapter implements CarrierAdapterService {
  protected abstract readonly carrierName: string;

  abstract bookShipment(
    bookingRequest: BookingRequest,
  ): Promise<NormalizedBookingResponse>;

  abstract trackShipment(
    trackingRequest: TrackingRequest,
  ): Promise<NormalizedTrackingResponse>;

  protected normalizeBookingResponse(
    trackingNumber: string,
    status: string,
    estimatedDelivery: Date,
    cost: number,
    rawResponse: Record<string, any>,
  ): NormalizedBookingResponse {
    return {
      trackingNumber,
      carrier: this.carrierName,
      status,
      estimatedDelivery,
      cost,
      rawResponse,
    };
  }

  protected normalizeTrackingResponse(
    trackingNumber: string,
    status: string,
    events: Array<{
      timestamp: Date;
      status: string;
      location: string;
      description: string;
    }>,
    currentLocation?: string,
    estimatedDelivery?: Date,
    rawResponse: Record<string, any> = {},
  ): NormalizedTrackingResponse {
    return {
      trackingNumber,
      carrier: this.carrierName,
      status,
      currentLocation,
      estimatedDelivery,
      events: events.map((event) => ({
        timestamp: event.timestamp,
        status: event.status,
        location: event.location,
        description: event.description,
      })),
      rawResponse,
    };
  }
}
