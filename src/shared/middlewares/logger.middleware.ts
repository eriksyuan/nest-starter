import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getRequestContext } from '../requestContext';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // 注入日志服务相关依赖
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 记录日志
    this.logger.info('request', {
      req: getRequestContext(req),
    });

    next();
  }
}
