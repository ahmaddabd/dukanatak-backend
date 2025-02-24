
import { Injectable } from '@nestjs/common';
import { InjectRedis } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class OtpService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async generateOtp(phoneNumber: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redis.set(`otp:${phoneNumber}`, otp, 'EX', 300); // صلاحية الرمز 5 دقائق
    return otp;
  }

  async verifyOtp(phoneNumber: string, otp: string): Promise<boolean> {
    const storedOtp = await this.redis.get(`otp:${phoneNumber}`);
    if (storedOtp === otp) {
      await this.redis.del(`otp:${phoneNumber}`);
      return true;
    }
    return false;
  }
}
