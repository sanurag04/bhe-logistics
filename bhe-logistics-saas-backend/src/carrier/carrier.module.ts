import { Module } from '@nestjs/common';
import { CarrierAdapterServiceImpl } from './carrier-adapter.service';
import { CarrierAdapterFactory } from './carrier-adapter.factory';
import { UPSAdapter } from './ups.adapter';
import { FedExAdapter } from './fedex.adapter';

@Module({
  providers: [
    UPSAdapter,
    FedExAdapter,
    CarrierAdapterFactory,
    {
      provide: 'CarrierAdapterService',
      useClass: CarrierAdapterServiceImpl,
    },
  ],
  exports: ['CarrierAdapterService'],
})
export class CarrierModule {}
