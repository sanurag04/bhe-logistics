import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ShipmentStatus {
  BOOKED = 'BOOKED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  franchiseId: string;

  @Column()
  carrier: string;

  @Column({ nullable: true })
  trackingNumber: string;

  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.BOOKED,
  })
  status: ShipmentStatus;

  @Column('json')
  bookingData: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
