
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Store } from '../../domain/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Store])],
  controllers: [AdminController],
  providers: [AdminService, UserRepository, StoreRepository],
})
export class AdminModule {}
