import { IsString } from 'class-validator';

export class TrackShipmentDto {
  @IsString()
  carrier: string;

  @IsString()
  trackingNumber: string;
}
