import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/src/users/user.entity';
import { Event } from 'src/src/events/event.entity';
import { Subscription } from 'src/src/subscriptions/subscriptions.entity';
import { Notification } from 'src/src/notifications/notification.entity';
import { NotificationStatus } from 'src/src/notifications/common/notification-status';
import { UserRole } from 'src/src/users/enums/user-role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async getStats() {
    const userCount = await this.userRepository.count();
    const eventCount = await this.eventRepository.count();
    const subscriptionCount = await this.subscriptionRepository.count();
    const notificationCount = await this.notificationRepository.count({
      where: { status: NotificationStatus.SENT },
    });

    return {
      userCount,
      eventCount,
      subscriptionCount,
      notificationCount,
    };
  }

  async updateRole(userId: string, role: UserRole) {
    return this.userRepository.update(userId, { role });
  }
}
