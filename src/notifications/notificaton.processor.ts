import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Processor('notifications')
@Injectable()
export class NotificationProcessor extends WorkerHost {
  constructor(
    private readonly subscriptionService: SubscriptionsService,
    private readonly notificationService: NotificationsService,
  ) {
    super();
  }
  async process(job: Job<{ eventId: string; userId: string }>) {
    if (job.name === 'eventPublished') {
      console.log(
        `Send notification to user ${job.data.userId} about event ${job.data.eventId}`,
      );
      const { eventId, userId } = job.data;

      try {
        await this.notificationService.send(userId, eventId);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
