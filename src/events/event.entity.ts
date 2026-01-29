import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventStatus } from './common/event-status.enum';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscriptions.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: EventStatus.DRAFT })
  status: EventStatus;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => Subscription, (subscription) => subscription.event)
  subscriptions: Subscription[];

  @Column()
  authorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
