import { Injectable } from '@nestjs/common';
import {
  CarrierAdapterService,
  BookingRequest,
  NormalizedBookingResponse,
  TrackingRequest,
  NormalizedTrackingResponse,
} from './carrier-adapter.interface';
import { CarrierAdapterFactory } from './carrier-adapter.factory';

@Injectable()
export class CarrierAdapterServiceImpl implements CarrierAdapterService {
  constructor(private readonly adapterFactory: CarrierAdapterFactory) {}

  async bookShipment(
    bookingRequest: BookingRequest,
  ): Promise<NormalizedBookingResponse> {
    const adapter = this.adapterFactory.getAdapter(bookingRequest.carrier);
    return adapter.bookShipment(bookingRequest);
  }

  async trackShipment(
    trackingRequest: TrackingRequest,
  ): Promise<NormalizedTrackingResponse> {
    const adapter = this.adapterFactory.getAdapter(trackingRequest.carrier);
    return adapter.trackShipment(trackingRequest);
  }
}
