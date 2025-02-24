
import { Repository, EntityRepository } from 'TypeORM';
import { OrderEntity } from '../entities/order.entity';

@EntityRepository(OrderEntity)
export class OrdersRepository extends Repository<OrderEntity> {
  // يمكنك إضافة أي دوال خاصة هنا لإدارة الطلبات بشكل مخصص
}
