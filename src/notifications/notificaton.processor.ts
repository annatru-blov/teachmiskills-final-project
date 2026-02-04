import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from 'src/src/subscriptions/subscriptions.service';
import { NotificationsService } from 'src/src/notifications/notifications.service';

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
      const { eventId } = job.data;
      const subscriptions =
        await this.subscriptionService.findByEventId(eventId);
      console.log(subscriptions);
      for (const sub of subscriptions) {
        await this.notificationService.send(sub.user.id, eventId);
      }
    }
  }
}
