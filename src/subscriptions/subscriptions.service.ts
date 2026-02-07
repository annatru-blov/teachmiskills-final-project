import { Injectable } from '@nestjs/common';
import { Subscription } from './subscriptions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionsService {
  @InjectRepository(Subscription)
  private subscriptionsRepository: Repository<Subscription>;

  async findByEventId(eventId: string) {
    return this.subscriptionsRepository.find({
      where: { event: { id: eventId } },
      relations: ['event', 'user'],
    });
  }

  async create(userId: string, eventId: string): Promise<Subscription> {
    const subscription = this.subscriptionsRepository.create({
      user: { id: userId },
      event: { id: eventId },
    });

    return this.subscriptionsRepository.save(subscription);
  }

  async delete(userId: string, eventId: string): Promise<void> {
    await this.subscriptionsRepository.delete({
      user: { id: userId },
      event: { id: eventId },
    });
  }
}
