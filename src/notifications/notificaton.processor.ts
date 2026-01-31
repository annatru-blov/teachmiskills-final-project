import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  async process(job: Job<{ eventId: string; userId: string }>) {
    if (job.name === 'eventPublished') {
      console.log(
        `Send notification to user ${job.data.userId} about event ${job.data.eventId}`,
      );
    }
  }
}
