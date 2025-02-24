
import { Store } from '../entities/store.entity';

export interface IStoreRepository {
  create(store: Store): Promise<Store>;
  findById(id: string): Promise<Store | null>;
  updateStatus(id: string, status: 'active' | 'pending' | 'rejected'): Promise<void>;
}
