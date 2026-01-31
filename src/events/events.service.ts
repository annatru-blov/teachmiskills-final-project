import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EventStatus } from './common/event-status.enum';
import { Subscription } from '../subscriptions/subscriptions.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
    @InjectQueue('notifications') private readonly notificationQueue: Queue,
  ) {}

  async findAllByUser(userId: string): Promise<Event[]> {
    return this.eventsRepository.find({
      where: { authorId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async create(userId: string, dto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create({
      ...dto,
      authorId: userId,
    });

    return this.eventsRepository.save(event);
  }

  async publishedEvent(eventId: string): Promise<void> {
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });
    const subscribers = await this.subscriptionsRepository.find({
      where: { event: { id: eventId } },
      relations: ['user'], //Relations helps you to work with related entities
    });

    const subscriberIds = subscribers.map((subscriber) => subscriber.user.id);
    console.log(subscriberIds);

    if (!event) {
      throw new NotFoundException(`Event with ID "${eventId}" not found`);
    }

    event.status = EventStatus.PUBLISHED;
    await this.eventsRepository.save(event);

    for (const userId of subscriberIds) {
      await this.notificationQueue.add('eventPublished', { eventId, userId });
    }
  }
}
