import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Shipment } from '../shipment/shipment.entity';
import type {
  CarrierAdapterService,
  BookingRequest,
  NormalizedBookingResponse,
  TrackingRequest,
  NormalizedTrackingResponse,
} from '../carrier/carrier-adapter.interface';
import { TrackingService } from '../tracking/tracking.service';
import { WalletService } from '../wallet/wallet.service';
import {
  BusinessException,
  PaymentRequiredException,
  ServiceUnavailableException,
  ValidationException,
  NotFoundException,
} from '../common/exceptions/business.exceptions';

@Injectable()
export class ShipmentBookingService {
  private readonly logger = new Logger(ShipmentBookingService.name);
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @Inject('CarrierAdapterService')
    private carrierAdapterService: CarrierAdapterService,
    private trackingService: TrackingService,
    private walletService: WalletService,
    private dataSource: DataSource,
  ) {}

  async bookShipment(bookingRequest: BookingRequest): Promise<Shipment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let walletTransactionId: string | undefined;
    const startTime = Date.now();

    this.logger.log(
      `Starting shipment booking for franchise ${bookingRequest.franchiseId} with carrier ${bookingRequest.carrier}`,
    );

    try {
      // Step 1: Validate booking request
      if (!bookingRequest.franchiseId || !bookingRequest.carrier) {
        throw new ValidationException('Franchise ID and carrier are required');
      }

      // Step 2: Call the carrier adapter to book the shipment
      this.logger.debug(
        `Calling carrier adapter for ${bookingRequest.carrier}`,
      );
      const normalizedResponse: NormalizedBookingResponse =
        await this.carrierAdapterService.bookShipment(bookingRequest);

      if (!normalizedResponse.trackingNumber || !normalizedResponse.cost) {
        throw new ServiceUnavailableException(
          `Invalid response from carrier ${bookingRequest.carrier}: missing tracking number or cost`,
        );
      }

      this.logger.log(
        `Carrier booking successful: ${normalizedResponse.trackingNumber} at cost ${normalizedResponse.cost}`,
      );

      // Step 3: Deduct from wallet
      this.logger.debug(
        `Deducting ${normalizedResponse.cost} from wallet for franchise ${bookingRequest.franchiseId}`,
      );
      const deductionResult = await this.walletService.deductAmount(
        bookingRequest.franchiseId,
        normalizedResponse.cost,
        undefined, // Will be set to shipmentId after creation
        `Shipment booking - ${bookingRequest.carrier} - ${normalizedResponse.trackingNumber}`,
      );

      if (!deductionResult.success) {
        this.logger.error(
          `Wallet deduction failed for franchise ${bookingRequest.franchiseId}: ${deductionResult.error}`,
        );
        throw new PaymentRequiredException(
          `Insufficient funds: ${deductionResult.error}`,
        );
      }

      walletTransactionId = deductionResult.transactionId;
      this.logger.log(
        `Wallet deduction successful, transaction ID: ${walletTransactionId}`,
      );

      // Step 4: Create shipment entity with normalized data
      this.logger.debug('Creating shipment entity');
      const shipment = queryRunner.manager.create(Shipment, {
        franchiseId: bookingRequest.franchiseId,
        carrier: normalizedResponse.carrier,
        trackingNumber: normalizedResponse.trackingNumber,
        status: normalizedResponse.status as any,
        bookingData: {
          request: bookingRequest,
          response: normalizedResponse,
          walletTransactionId,
        },
      });

      // Step 5: Save shipment in the same transaction
      this.logger.debug('Saving shipment to database');
      const savedShipment = await queryRunner.manager.save(shipment);
      this.logger.log(`Shipment saved with ID: ${savedShipment.id}`);

      // Step 6: Update wallet transaction with shipment reference
      if (walletTransactionId) {
        this.logger.debug(
          `Updating wallet transaction ${walletTransactionId} with shipment reference`,
        );
        await queryRunner.manager.update(
          'wallet_transactions', // Using table name since we don't have the entity imported
          { id: walletTransactionId },
          { referenceId: savedShipment.id },
        );
      }

      // Commit the transaction
      await queryRunner.commitTransaction();
      this.logger.log(
        `Shipment booking completed successfully in ${Date.now() - startTime}ms. Shipment ID: ${savedShipment.id}`,
      );

      // Step 7: Sync initial tracking information (outside transaction since it's not critical)
      try {
        this.logger.debug('Syncing initial tracking information');
        await this.trackingService.syncShipmentTracking(savedShipment.id);
        this.logger.log('Initial tracking sync completed');
      } catch (error) {
        this.logger.warn(
          `Failed to sync initial tracking for shipment ${savedShipment.id}: ${error.message}`,
        );
        // Don't fail the booking for tracking issues
      }

      return savedShipment;
    } catch (error) {
      // Log the error with context
      this.logger.error(
        `Shipment booking failed for franchise ${bookingRequest.franchiseId}: ${error.message}`,
        error.stack,
      );

      // Rollback the transaction
      try {
        await queryRunner.rollbackTransaction();
        this.logger.log('Database transaction rolled back');
      } catch (rollbackError) {
        this.logger.error(
          `Failed to rollback database transaction: ${rollbackError.message}`,
        );
      }

      // If wallet was deducted, we need to rollback that too
      if (walletTransactionId) {
        try {
          this.logger.debug(
            `Rolling back wallet transaction ${walletTransactionId}`,
          );
          await this.walletService.rollbackTransaction(walletTransactionId);
          this.logger.log('Wallet transaction rolled back successfully');
        } catch (rollbackError) {
          this.logger.error(
            `Failed to rollback wallet transaction ${walletTransactionId}: ${rollbackError.message}`,
          );
        }
      }

      // Re-throw the original error if it's already a BusinessException
      if (error instanceof BusinessException) {
        throw error;
      }

      // Wrap unexpected errors in a ServiceUnavailableException
      throw new ServiceUnavailableException(
        `Shipment booking failed due to an unexpected error: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByFranchise(franchiseId: string): Promise<Shipment[]> {
    try {
      this.logger.debug(`Finding all shipments for franchise ${franchiseId}`);
      const shipments = await this.shipmentRepository.find({
        where: { franchiseId },
        order: { createdAt: 'DESC' },
      });
      this.logger.log(
        `Found ${shipments.length} shipments for franchise ${franchiseId}`,
      );
      return shipments;
    } catch (error) {
      this.logger.error(
        `Failed to find shipments for franchise ${franchiseId}: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        'Failed to retrieve shipments. Please try again later.',
      );
    }
  }

  async findOne(id: string): Promise<Shipment> {
    try {
      this.logger.debug(`Finding shipment with ID ${id}`);
      const shipment = await this.shipmentRepository.findOne({ where: { id } });
      if (!shipment) {
        this.logger.warn(`Shipment with ID ${id} not found`);
        throw new NotFoundException('Shipment', id);
      }
      this.logger.log(`Shipment ${id} found successfully`);
      return shipment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to find shipment ${id}: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        'Failed to retrieve shipment. Please try again later.',
      );
    }
  }

  async trackShipment(
    carrier: string,
    trackingNumber: string,
  ): Promise<NormalizedTrackingResponse> {
    try {
      this.logger.debug(
        `Tracking shipment ${trackingNumber} with carrier ${carrier}`,
      );
      const trackingRequest: TrackingRequest = { carrier, trackingNumber };
      const trackingResponse =
        await this.carrierAdapterService.trackShipment(trackingRequest);
      this.logger.log(
        `Tracking successful for ${carrier} shipment ${trackingNumber}`,
      );
      return trackingResponse;
    } catch (error) {
      this.logger.error(
        `Failed to track shipment ${trackingNumber} with carrier ${carrier}: ${error.message}`,
        error.stack,
      );
      throw new ServiceUnavailableException(
        `Tracking service is currently unavailable for ${carrier}. Please try again later.`,
      );
    }
  }
}
