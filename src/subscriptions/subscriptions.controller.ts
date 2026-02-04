import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { AuthGuard } from '../common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptions: SubscriptionsService) {}

  @Get()
  getByEventId(@Body('eventId') eventId: string) {
    return this.subscriptions.findByEventId(eventId);
  }

  @HttpCode(201)
  @Post()
  create(@Req() req, @Body('eventId') eventId: string) {
    const userId = req.user.sub;
    return this.subscriptions.create(userId, eventId);
  }

  @HttpCode(204)
  @Delete()
  unsubscribe(@Req() req, @Body('eventId') eventId: string) {
    const userId = req.user.sub;
    return this.subscriptions.delete(userId, eventId);
  }
}
