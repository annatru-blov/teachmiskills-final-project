import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PinoLogger } from 'nestjs-pino';

@Processor('notifications')
@Injectable()
export class NotificationProcessor extends WorkerHost {
  constructor(
    private readonly subscriptionService: SubscriptionsService,
    private readonly notificationService: NotificationsService,
    private readonly logger: PinoLogger,
  ) {
    super();
  }
  async process(job: Job<{ eventId: string; userId: string }>) {
    if (job.name === 'eventPublished') {
      console.log(
        `Send notification to user ${job.data.userId} about event ${job.data.eventId}`,
      );
      const { eventId, userId } = job.data;

      this.logger.info(
        `Sending notification to user ${userId} about event ${eventId}`,
      );

      try {
        await this.notificationService.send(userId, eventId);
        this.logger.info(`Notification sent to user ${userId}`);
      } catch (error) {
        console.log(error);
        this.logger.error(
          `Failed to send notification to user  ${userId} `,
          error,
        );
      }
    }
  }
}
