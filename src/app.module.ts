import { RedisModule } from 'nestjs-redis';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './application/auth/auth.module';
import { StoresModule } from './application/stores/stores.module';
import { CustomersModule } from './application/customers/customers.module';
import { CustomerStoresModule } from './application/customer-stores/customer-stores.module';
import { AdminModule } from './application/admin/admin.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
RedisModule.register({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
}),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    StoresModule,
    CustomersModule,
    CustomerStoresModule,
    AdminModule,
  ],
})
export class AppModule {}
