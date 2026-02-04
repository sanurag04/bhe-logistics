import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingEvent } from './tracking-event.entity';
import { Shipment } from '../shipment/shipment.entity';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { CarrierModule } from '../carrier/carrier.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrackingEvent, Shipment]), CarrierModule],
  providers: [TrackingService],
  controllers: [TrackingController],
  exports: [TrackingService],
})
export class TrackingModule {}
