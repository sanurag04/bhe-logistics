import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { IsString, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { FranchiseAccessGuard } from '../modules/auth/guards/franchise-access.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
import { Roles } from '../modules/auth/decorators/roles.decorator';
import { UserRole } from '../modules/auth/user.entity';

class CreateWalletDto {
  @IsUUID()
  franchiseId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  initialBalance?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  creditLimit?: number;
}

class AddFundsDto {
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;
}

@Controller('wallet')
@UseGuards(JwtAuthGuard, FranchiseAccessGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(
      createWalletDto.franchiseId,
      createWalletDto.initialBalance || 0,
      createWalletDto.creditLimit || 0,
    );
  }

  @Get('balance/:franchiseId')
  async getBalance(@Param('franchiseId') franchiseId: string) {
    const balance = await this.walletService.getWalletBalance(franchiseId);
    return { balance };
  }

  @Post('add-funds/:franchiseId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async addFunds(
    @Param('franchiseId') franchiseId: string,
    @Body() addFundsDto: AddFundsDto,
  ) {
    return this.walletService.addAmount(
      franchiseId,
      addFundsDto.amount,
      undefined,
      addFundsDto.description,
    );
  }

  @Get('transactions/:franchiseId')
  async getTransactionHistory(@Param('franchiseId') franchiseId: string) {
    return this.walletService.getTransactionHistory(franchiseId);
  }

  @Post('rollback/:transactionId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async rollbackTransaction(@Param('transactionId') transactionId: string) {
    await this.walletService.rollbackTransaction(transactionId);
    return { message: 'Transaction rolled back successfully' };
  }
}
