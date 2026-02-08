import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from './pino-logger.config';

@Module({
  imports: [PinoLoggerModule.forRoot(pinoLoggerConfig())],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
