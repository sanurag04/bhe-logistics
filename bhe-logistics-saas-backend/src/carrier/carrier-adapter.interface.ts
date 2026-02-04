export interface BookingRequest {
  franchiseId: string;
  carrier: string;
  origin: string;
  destination: string;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  // Add other fields as needed
}

export interface NormalizedBookingResponse {
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery: Date;
  cost: number;
  rawResponse: Record<string, any>; // Original carrier response
}

export interface TrackingRequest {
  carrier: string;
  trackingNumber: string;
}

export interface NormalizedTrackingResponse {
  trackingNumber: string;
  carrier: string;
  status: string;
  currentLocation?: string;
  estimatedDelivery?: Date;
  events: TrackingEvent[];
  rawResponse: Record<string, any>;
}

export interface TrackingEvent {
  timestamp: Date;
  status: string;
  location: string;
  description: string;
}

export interface CarrierAdapterService {
  bookShipment(
    bookingRequest: BookingRequest,
  ): Promise<NormalizedBookingResponse>;
  trackShipment(
    trackingRequest: TrackingRequest,
  ): Promise<NormalizedTrackingResponse>;
}
