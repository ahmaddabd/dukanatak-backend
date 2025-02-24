
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IStoreRepository } from '../../domain/repositories/store.repository.interface';
import { Store } from '../../domain/entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repository: Repository<Store>,
  ) {}

  async create(store: Store): Promise<Store> {
    return this.repository.save(store);
  }

  async findById(id: string): Promise<Store | null> {
    return this.repository.findOne({ where: { id } });
  }

  async updateStatus(id: string, status: 'active' | 'pending' | 'rejected'): Promise<void> {
    await this.repository.update(id, { status });
  }
}
