import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/src/events/event.entity';
import { Subscription } from 'src/src/subscriptions/subscriptions.entity';
import { User } from 'src/src/users/user.entity';
import { Notification } from 'src/src/notifications/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Subscription, User, Notification]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
