import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Franchise } from './franchise.entity';
import {
  NotFoundException,
  BusinessException,
} from '../common/exceptions/business.exceptions';

@Injectable()
export class FranchiseService {
  constructor(
    @InjectRepository(Franchise)
    private franchiseRepository: Repository<Franchise>,
  ) {}

  async create(franchiseData: Partial<Franchise>): Promise<Franchise> {
    try {
      const franchise = this.franchiseRepository.create(franchiseData);
      return await this.franchiseRepository.save(franchise);
    } catch (error) {
      throw new BusinessException('Failed to create franchise');
    }
  }

  async findAll(): Promise<Franchise[]> {
    try {
      return await this.franchiseRepository.find();
    } catch (error) {
      throw new BusinessException('Failed to retrieve franchises');
    }
  }

  async findOne(id: string): Promise<Franchise> {
    try {
      const franchise = await this.franchiseRepository.findOne({
        where: { id },
      });
      if (!franchise) {
        throw new NotFoundException('Franchise', id);
      }
      return franchise;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BusinessException('Failed to retrieve franchise');
    }
  }

  async update(id: string, updateData: Partial<Franchise>): Promise<Franchise> {
    try {
      const franchise = await this.findOne(id);
      Object.assign(franchise, updateData);
      return await this.franchiseRepository.save(franchise);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BusinessException('Failed to update franchise');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const franchise = await this.findOne(id);
      await this.franchiseRepository.remove(franchise);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BusinessException('Failed to delete franchise');
    }
  }
}
