
import { Repository, EntityRepository } from 'TypeORM';
import { CustomerStore } from '../../domain/entities/customer-store.entity';

@EntityRepository(CustomerStore)
export class CustomerStoreRepository extends Repository<CustomerStore> {

  async linkCustomerToStore(customerId: string, storeId: string): Promise<CustomerStore> {
    const customerStore = this.create({ customerId, storeId });
    return this.save(customerStore);
  }

  async findStoresByCustomer(customerId: string): Promise<CustomerStore[]> {
    return this.find({ where: { customerId }, relations: ['store'] });
  }
}
