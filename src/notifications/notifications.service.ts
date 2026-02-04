import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from 'src/src/notifications/notification.entity';
import { NotificationStatus } from 'src/src/notifications/common/notification-status';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async send(userId: string, eventId: string) {
    await this.notificationRepository.save({
      userId,
      eventId,
      status: NotificationStatus.SENT,
    });
  }
}
