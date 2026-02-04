import { Injectable } from '@nestjs/common';
import { BaseCarrierAdapter } from './base-carrier.adapter';
import { BookingRequest, TrackingRequest } from './carrier-adapter.interface';

@Injectable()
export class FedExAdapter extends BaseCarrierAdapter {
  protected readonly carrierName = 'FEDEX';

  async bookShipment(bookingRequest: BookingRequest) {
    // Simulate FedEx API call
    const fedexResponse = await this.callFedExBookingAPI(bookingRequest);

    return this.normalizeBookingResponse(
      fedexResponse.trackingNumber,
      'BOOKED',
      new Date(fedexResponse.estimatedDelivery),
      fedexResponse.totalCharges,
      fedexResponse,
    );
  }

  async trackShipment(trackingRequest: TrackingRequest) {
    // Simulate FedEx tracking API call
    const fedexResponse = await this.callFedExTrackingAPI(
      trackingRequest.trackingNumber,
    );

    const events = fedexResponse.trackDetails.map((detail) => ({
      timestamp: new Date(detail.timestamp),
      status: detail.status,
      location: detail.location,
      description: detail.description,
    }));

    return this.normalizeTrackingResponse(
      trackingRequest.trackingNumber,
      fedexResponse.currentStatus,
      events,
      fedexResponse.currentLocation,
      fedexResponse.estimatedDelivery
        ? new Date(fedexResponse.estimatedDelivery)
        : undefined,
      fedexResponse,
    );
  }

  private async callFedExBookingAPI(request: BookingRequest) {
    // Mock FedEx booking API response
    await new Promise((resolve) => setTimeout(resolve, 180));

    return {
      trackingNumber: `7${Math.random().toString().substr(2, 11)}`,
      estimatedDelivery: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      totalCharges: 85.25,
      shipmentId: `FDX${Date.now()}`,
      serviceType: 'FEDEX_GROUND',
    };
  }

  private async callFedExTrackingAPI(trackingNumber: string) {
    // Mock FedEx tracking API response
    await new Promise((resolve) => setTimeout(resolve, 120));

    return {
      trackingNumber,
      currentStatus: 'DELIVERED',
      currentLocation: 'Delivered',
      estimatedDelivery: null, // Already delivered
      trackDetails: [
        {
          timestamp: '2026-01-24T09:00:00Z',
          status: 'PICKED_UP',
          location: 'Boston, MA',
          description: 'Picked up',
        },
        {
          timestamp: '2026-01-25T16:45:00Z',
          status: 'IN_TRANSIT',
          location: 'Newark, NJ',
          description: 'Departed FedEx location',
        },
        {
          timestamp: '2026-01-26T11:30:00Z',
          status: 'DELIVERED',
          location: 'New York, NY',
          description: 'Delivered',
        },
      ],
    };
  }
}
