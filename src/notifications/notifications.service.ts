import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { NotificationStatus } from './common/notification-status';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async send(userId: string, eventId: string) {
    const notification = await this.notificationRepository.findOne({
      where: { userId, eventId },
    });

    if (notification) {
      throw new BadRequestException('Notification already sent');
    }

    const newNotification = await this.notificationRepository.save({
      userId,
      eventId,
      status: NotificationStatus.SENT,
    });

    return newNotification;
  }
}
