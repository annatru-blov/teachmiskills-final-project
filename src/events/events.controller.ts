import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from 'src/src/common/guards/roles.guard';
import { Roles } from 'src/src/common/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Get()
  findAllByUser(@Req() req) {
    const userId = req.user.sub;
    return this.events.findAllByUser(userId);
  }

  @Post()
  @HttpCode(201)
  create(@Req() req, @Body() dto: CreateEventDto) {
    const userId = req.user.sub;
    return this.events.create(userId, dto);
  }

  @Roles(['admin'])
  @Post(':id/publish')
  @HttpCode(201)
  publish(@Param('id') eventId: string) {
    return this.events.publishedEvent(eventId);
  }
}
