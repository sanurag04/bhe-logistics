import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipment.entity';
import { ShipmentBookingService } from './shipment-booking.service';
import { ShipmentController } from './shipment.controller';
import { CarrierModule } from '../carrier/carrier.module';
import { TrackingModule } from '../tracking/tracking.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shipment]),
    CarrierModule,
    TrackingModule,
    WalletModule,
  ],
  providers: [ShipmentBookingService],
  controllers: [ShipmentController],
  exports: [ShipmentBookingService],
})
export class ShipmentModule {}
