import { Params } from 'nestjs-pino';

export const pinoLoggerConfig = (): Params => ({
  pinoHttp: {
    level: process.env.PINO_LOG_LEVEL || 'info',
    transport:
      process.env.NODE_ENV === 'production'
        ? undefined
        : {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          },
  },
});
