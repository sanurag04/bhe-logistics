import {
  IsString,
  IsNumber,
  IsOptional,
  IsObject,
  Min,
  IsUUID,
} from 'class-validator';

export class BookShipmentDto {
  @IsUUID()
  franchiseId: string;

  @IsString()
  carrier: string;

  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsNumber()
  @Min(0.1)
  weight: number;

  @IsOptional()
  @IsObject()
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}
