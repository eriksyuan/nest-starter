import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';

import type { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getRequestContext } from '../requestContext';

// https://docs.nestjs.com/exception-filters
@Catch(HttpException)
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const request = ctx.getRequest();

    const exception_responese = exception.getResponse();

    const exception_obj_message =
      typeof exception_responese !== 'string'
        ? Array.isArray(exception_responese?.['message'])
          ? exception_responese?.['message'][0]
          : exception_responese?.['message']
        : null;

    const res_ctx = {
      code: status,
      success: false,
      message: exception_obj_message ?? exception.message,
    };

    this.logger.error(res_ctx.message, {
      status,
      req: getRequestContext(request),
      stack: exception.stack,
    });

    response.status(status).json(res_ctx);
  }
}
