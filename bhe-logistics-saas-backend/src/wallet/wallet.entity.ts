import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Franchise } from '../franchise/franchise.entity';

export enum WalletStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  franchiseId: string;

  @OneToOne(() => Franchise)
  @JoinColumn({ name: 'franchiseId' })
  franchise: Franchise;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: WalletStatus,
    default: WalletStatus.ACTIVE,
  })
  status: WalletStatus;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  creditLimit: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
