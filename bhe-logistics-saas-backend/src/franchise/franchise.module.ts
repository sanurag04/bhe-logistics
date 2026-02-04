import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchise } from './franchise.entity';
import { FranchiseService } from './franchise.service';
import { FranchiseController } from './franchise.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Franchise])],
  providers: [FranchiseService],
  controllers: [FranchiseController],
  exports: [FranchiseService, TypeOrmModule],
})
export class FranchiseModule {}
