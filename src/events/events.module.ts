import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { Subscription } from '../subscriptions/subscriptions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Subscription]),
    NotificationsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
