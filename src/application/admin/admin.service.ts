
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async approveStore(storeId: string) {
    return this.storeRepository.updateStatus(storeId, 'active');
  }

  async rejectStore(storeId: string) {
    return this.storeRepository.updateStatus(storeId, 'rejected');
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getAllStores() {
    return this.storeRepository.findAll();
  }

  async blockUser(adminId: string, userId: string) {
    const admin = await this.userRepository.findById(adminId);
    const userToBlock = await this.userRepository.findById(userId);
    if (!admin || !userToBlock) throw new NotFoundException('User not found');
    if (admin.role !== 'admin') throw new ForbiddenException('Permission denied');
    if (userToBlock.role === 'admin') throw new ForbiddenException('Cannot block another admin');
    return this.userRepository.updateStatus(userId, 'blocked');
  }

  async unblockUser(userId: string) {
    return this.userRepository.updateStatus(userId, 'active');
  }

  async changeUserRole(userId: string, role: string) {
    return this.userRepository.updateRole(userId, role);
  }

  async getUserById(userId: string) {
    return this.userRepository.findById(userId);
  }

  async deleteUser(userId: string) {
    return this.userRepository.delete(userId);
  }
}


async getStoreById(storeId: string): Promise<Store> {
  return this.storeRepository.findOne({ where: { id: storeId } });
}

async getCustomers(): Promise<Customer[]> {
  return this.customerRepository.find();
}

async getCustomerById(customerId: string): Promise<Customer> {
  return this.customerRepository.findOne({ where: { id: customerId } });
}
