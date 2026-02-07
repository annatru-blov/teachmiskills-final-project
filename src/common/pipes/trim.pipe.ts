import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateEventDto } from 'src/src/events/dto/create-event.dto';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(object: CreateEventDto) {
    if (typeof object !== 'object') return object;

    for (const key in object) {
      if (typeof object[key] === 'string') {
        object[key] = object[key].trim();
      }
    }
    return object;
  }
}
