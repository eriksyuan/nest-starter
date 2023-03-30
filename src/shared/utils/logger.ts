import { transports, format } from 'winston';
import type { WinstonModuleOptions } from 'nest-winston';
import 'winston-daily-rotate-file';

const dailyTransport = new transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: 'logs',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
  ),
});

export const winstonModuleOptions: WinstonModuleOptions = {
  transports:
    process.env.NODE_ENV === 'dev'
      ? [new transports.Console()]
      : [dailyTransport],
};
