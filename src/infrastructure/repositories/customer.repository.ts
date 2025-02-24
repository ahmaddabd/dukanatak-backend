
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../../domain/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async findByPhoneNumber(phoneNumber: string): Promise<Customer | null> {
    return this.repository.findOne({ where: { phoneNumber } });
  }

  async createOrUpdateOtp(phoneNumber: string, otpCode: string, otpExpiresAt: Date): Promise<Customer> {
    let customer = await this.findByPhoneNumber(phoneNumber);
    if (!customer) {
      customer = this.repository.create({ phoneNumber, otpCode, otpExpiresAt });
    } else {
      customer.otpCode = otpCode;
      customer.otpExpiresAt = otpExpiresAt;
    }
    return this.repository.save(customer);
  }

  async verifyOtp(phoneNumber: string, otpCode: string): Promise<boolean> {
    const customer = await this.findByPhoneNumber(phoneNumber);
    return customer && customer.otpCode === otpCode && customer.otpExpiresAt > new Date();
  }
}
