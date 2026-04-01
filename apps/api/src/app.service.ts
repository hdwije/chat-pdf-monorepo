import { Injectable } from '@nestjs/common';
import { UserProfile } from '@repo/types';

@Injectable()
export class AppService {
  getProfile(): UserProfile {
    return {
      id: 'abc123',
      name: 'Hemantha',
      email: 'hemantha@example.com',
    };
  }
}
