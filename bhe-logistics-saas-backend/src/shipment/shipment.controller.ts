import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ShipmentBookingService } from './shipment-booking.service';
import { BookShipmentDto } from './dto/book-shipment.dto';
import type { BookingRequest } from '../carrier/carrier-adapter.interface';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { FranchiseAccessGuard } from '../modules/auth/guards/franchise-access.guard';

@Controller('shipment')
@UseGuards(JwtAuthGuard, FranchiseAccessGuard)
export class ShipmentController {
  constructor(
    private readonly shipmentBookingService: ShipmentBookingService,
  ) {}

  @Post('book')
  async bookShipment(@Body() bookShipmentDto: BookShipmentDto) {
    return this.shipmentBookingService.bookShipment(
      bookShipmentDto as BookingRequest,
    );
  }

  @Get('franchise/:franchiseId')
  async getShipmentsByFranchise(@Param('franchiseId') franchiseId: string) {
    return this.shipmentBookingService.findAllByFranchise(franchiseId);
  }

  @Get(':id')
  async getShipment(@Param('id') id: string) {
    return this.shipmentBookingService.findOne(id);
  }

  @Get('track/:carrier/:trackingNumber')
  async trackShipment(
    @Param('carrier') carrier: string,
    @Param('trackingNumber') trackingNumber: string,
  ) {
    return this.shipmentBookingService.trackShipment(carrier, trackingNumber);
  }
}
