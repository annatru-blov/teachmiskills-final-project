import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../users/enums/user-role.enum';
import { NotificationStatus } from '../notifications/common/notification-status';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscriptions.entity';
import { Event } from '../events/event.entity';
import { Notification } from '../notifications/notification.entity';

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
