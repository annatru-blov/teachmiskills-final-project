import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationStatus } from './common/notification-status';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  status: NotificationStatus;

  @Column()
  userId: string;

  @Column()
  eventId: string;
}
