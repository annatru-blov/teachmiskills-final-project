import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { BullModule } from '@nestjs/bullmq';
import { NotificationProcessor } from './notificaton.processor';
import { Notification } from './notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    BullModule.registerQueue({ name: 'notifications' }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationProcessor],
  exports: [NotificationsService, BullModule],
})
export class NotificationsModule {}
