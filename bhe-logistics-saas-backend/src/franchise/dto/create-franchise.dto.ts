import { IsString, IsOptional, IsObject } from 'class-validator';
import { FranchiseStatus } from '../franchise.entity';

export class CreateFranchiseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  status?: FranchiseStatus;

  @IsOptional()
  @IsObject()
  brandingConfig?: Record<string, any>;
}
