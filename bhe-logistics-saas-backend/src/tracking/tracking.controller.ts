import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
import { Roles } from '../modules/auth/decorators/roles.decorator';
import { UserRole } from '../modules/auth/user.entity';

@Controller('tracking')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('sync/:shipmentId')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async syncShipmentTracking(@Param('shipmentId') shipmentId: string) {
    await this.trackingService.syncShipmentTracking(shipmentId);
    return { message: 'Tracking synced successfully' };
  }

  @Post('sync-all')
  @Roles(UserRole.ADMIN)
  async syncAllActiveShipments() {
    await this.trackingService.syncAllActiveShipments();
    return { message: 'All active shipments synced successfully' };
  }

  @Get('events/:shipmentId')
  async getTrackingEvents(@Param('shipmentId') shipmentId: string) {
    return this.trackingService.getTrackingEvents(shipmentId);
  }
}
