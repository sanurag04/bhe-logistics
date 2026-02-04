import { Injectable, NotImplementedException } from '@nestjs/common';
import { CarrierAdapterService } from './carrier-adapter.interface';
import { UPSAdapter } from './ups.adapter';
import { FedExAdapter } from './fedex.adapter';

@Injectable()
export class CarrierAdapterFactory {
  constructor(
    private readonly upsAdapter: UPSAdapter,
    private readonly fedexAdapter: FedExAdapter,
  ) {}

  getAdapter(carrier: string): CarrierAdapterService {
    switch (carrier.toUpperCase()) {
      case 'UPS':
        return this.upsAdapter;
      case 'FEDEX':
        return this.fedexAdapter;
      default:
        throw new NotImplementedException(
          `Carrier ${carrier} is not supported`,
        );
    }
  }
}
