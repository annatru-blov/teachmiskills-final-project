import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getQueueToken } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

describe('Events e2e', () => {
  let app: INestApplication;
  let notificationQueue: Queue;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getQueueToken('notifications'))
      .useValue({
        add: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    notificationQueue = moduleFixture.get<Queue>(
      getQueueToken('notifications'),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an event and enqueue notifications when published', async () => {
    const eventDto = {
      title: 'E2E Test Event',
      description: 'Testing notifications queue',
    };

    const userToken =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMjU3NTQwZi1mNDNkLTQ2MGItODIxNi1jMmFmNjA4NjBmZjAiLCJ1c2VybmFtZSI6IkFubmEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzA0NzQ3MDUsImV4cCI6MTc3MDQ3ODMwNX0.7xY1hK37mxW3Y81-QFvlH6nWYyl7ku6Bvl9noLEquRk';

    const createRes = await request(app.getHttpServer())
      .post('/events')
      .set('Authorization', userToken)
      .send(eventDto)
      .expect(201);

    expect(createRes.body).toHaveProperty('id');

    const eventId = createRes.body.id;

    await request(app.getHttpServer())
      .patch(`/events/${eventId}/publish`)
      .set('Authorization', userToken)
      .expect(200);

    expect(notificationQueue.add).toHaveBeenCalled();

    const [jobName, jobData] = (notificationQueue.add as jest.Mock).mock
      .calls[0];
    expect(jobName).toBe('eventPublished');
    expect(jobData.eventId).toBe(eventId);
    expect(jobData.userId).toBeDefined();
  });
});
