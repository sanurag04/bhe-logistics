import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FranchiseModule } from './franchise/franchise.module';
import { Franchise } from './franchise/franchise.entity';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/auth/user.entity';
import { ShipmentModule } from './shipment/shipment.module';
import { Shipment } from './shipment/shipment.entity';
import { CarrierModule } from './carrier/carrier.module';
import { TrackingModule } from './tracking/tracking.module';
import { TrackingEvent } from './tracking/tracking-event.entity';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './wallet/wallet.entity';
import { WalletTransaction } from './wallet/wallet-transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'bhe_logistics',
      entities: [
        Franchise,
        User,
        Shipment,
        TrackingEvent,
        Wallet,
        WalletTransaction,
      ],
      synchronize: process.env.NODE_ENV !== 'production', // disable in prod
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    FranchiseModule,
    AuthModule,
    ShipmentModule,
    CarrierModule,
    TrackingModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
