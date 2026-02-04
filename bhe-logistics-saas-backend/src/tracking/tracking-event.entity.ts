import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Shipment } from '../shipment/shipment.entity';

export enum TrackingStatus {
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  EXCEPTION = 'EXCEPTION',
  RETURNED = 'RETURNED',
}

@Entity('tracking_events')
export class TrackingEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  shipmentId: string;

  @ManyToOne(() => Shipment)
  @JoinColumn({ name: 'shipmentId' })
  shipment: Shipment;

  @Column({
    type: 'enum',
    enum: TrackingStatus,
  })
  status: TrackingStatus;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ nullable: true })
  carrierStatusCode?: string;

  @Column('json', { nullable: true })
  rawData?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
