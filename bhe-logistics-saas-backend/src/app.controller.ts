import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { FranchiseAccessGuard } from './modules/auth/guards/franchise-access.guard';
import { Roles } from './modules/auth/decorators/roles.decorator';
import { UserRole } from './modules/auth/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAdminData(): string {
    return 'This is admin only data';
  }

  @Get('manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  getManagerData(): string {
    return 'This is manager or admin data';
  }

  @Get('franchise/:franchiseId/data')
  @UseGuards(JwtAuthGuard, FranchiseAccessGuard)
  getFranchiseData(@Param('franchiseId') franchiseId: string): string {
    return `This is data for franchise ${franchiseId}`;
  }
}
