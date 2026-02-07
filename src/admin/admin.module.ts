import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscriptions.entity';
import { Event } from '../events/event.entity';
import { Notification } from '../notifications/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Subscription, User, Notification]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
