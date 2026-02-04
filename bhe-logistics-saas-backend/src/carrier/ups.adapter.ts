import { Injectable } from '@nestjs/common';
import { BaseCarrierAdapter } from './base-carrier.adapter';
import { BookingRequest, TrackingRequest } from './carrier-adapter.interface';

@Injectable()
export class UPSAdapter extends BaseCarrierAdapter {
  protected readonly carrierName = 'UPS';

  async bookShipment(bookingRequest: BookingRequest) {
    // Simulate UPS API call
    const upsResponse = await this.callUPSBookingAPI(bookingRequest);

    return this.normalizeBookingResponse(
      upsResponse.trackingNumber,
      'BOOKED',
      new Date(upsResponse.estimatedDelivery),
      upsResponse.totalCharges,
      upsResponse,
    );
  }

  async trackShipment(trackingRequest: TrackingRequest) {
    // Simulate UPS tracking API call
    const upsResponse = await this.callUPSTrackingAPI(
      trackingRequest.trackingNumber,
    );

    const events = upsResponse.trackDetails.map((detail) => ({
      timestamp: new Date(detail.date + ' ' + detail.time),
      status: detail.status,
      location: detail.location,
      description: detail.description,
    }));

    return this.normalizeTrackingResponse(
      trackingRequest.trackingNumber,
      upsResponse.currentStatus,
      events,
      upsResponse.currentLocation,
      upsResponse.estimatedDelivery
        ? new Date(upsResponse.estimatedDelivery)
        : undefined,
      upsResponse,
    );
  }

  private async callUPSBookingAPI(request: BookingRequest) {
    // Mock UPS booking API response
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      trackingNumber: `1Z${Math.random().toString(36).substr(2, 15).toUpperCase()}`,
      estimatedDelivery: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      totalCharges: 75.5,
      shipmentId: `UPS${Date.now()}`,
      serviceType: 'GROUND',
    };
  }

  private async callUPSTrackingAPI(trackingNumber: string) {
    // Mock UPS tracking API response
    await new Promise((resolve) => setTimeout(resolve, 150));

    return {
      trackingNumber,
      currentStatus: 'IN_TRANSIT',
      currentLocation: 'Los Angeles, CA',
      estimatedDelivery: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      trackDetails: [
        {
          date: '2026-01-26',
          time: '08:00',
          status: 'PICKED_UP',
          location: 'New York, NY',
          description: 'Package picked up',
        },
        {
          date: '2026-01-27',
          time: '14:30',
          status: 'IN_TRANSIT',
          location: 'Chicago, IL',
          description: 'Arrived at sorting facility',
        },
        {
          date: '2026-01-28',
          time: '10:15',
          status: 'IN_TRANSIT',
          location: 'Los Angeles, CA',
          description: 'Out for delivery',
        },
      ],
    };
  }
}
