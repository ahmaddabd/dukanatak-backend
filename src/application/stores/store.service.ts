
import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async create(createStoreDto: CreateStoreDto) {
    return this.storeRepository.create(createStoreDto);
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeRepository.findById(id);
    if (!store) throw new NotFoundException('Store not found');
    Object.assign(store, updateStoreDto);
    return this.storeRepository.save(store);
  }

  async delete(id: string) {
    return this.storeRepository.delete(id);
  }

  async approveStore(id: string) {
    return this.storeRepository.updateStatus(id, 'active');
  }

  async getStore(id: string) {
    const store = await this.storeRepository.findById(id);
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }
}


async isSlugAvailable(slug: string): Promise<boolean> {
  const store = await this.storeRepository.findOne({ where: { slug } });
  return !store;
}
