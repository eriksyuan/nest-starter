import { BaseExceptionFilter } from './filters/base-exception.filter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfig } from './utils/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { winstonModuleOptions } from './utils/logger';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { username, port, password, host, database } =
          configService.get('DATE_BASE');
        const isDev = configService.get('env') === 'dev';
        return {
          type: 'mysql',
          username,
          port,
          password,
          host,
          database,
          autoLoadEntities: true,
          dropSchema: false,
          synchronize: isDev,
        };
      },
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    WinstonModule.forRoot(winstonModuleOptions),
  ],
  exports: [ConfigModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
  ],
})
export class SharedModule {}
