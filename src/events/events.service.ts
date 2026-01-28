import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  @InjectRepository(Event)
  private readonly eventsRepository: Repository<Event>;

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
}
