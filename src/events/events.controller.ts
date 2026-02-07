import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { TrimPipe } from '../common/pipes/trim.pipe';
import { LoggerInterceptor } from '../common/interceptors/logger.interceptors';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggerInterceptor)
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
  create(@Req() req, @Body(new TrimPipe()) dto: CreateEventDto) {
    const userId = req.user.sub;
    return this.events.create(userId, dto);
  }

  @Roles(['admin'])
  @Patch(':id/publish')
  @HttpCode(200)
  publish(@Param('id') eventId: string) {
    return this.events.publishedEvent(eventId);
  }

  @Roles(['admin'])
  @Patch(':id/cancel')
  @HttpCode(200)
  cancel(@Param('id') eventId: string) {
    return this.events.deletePublishedEvent(eventId);
  }
}
