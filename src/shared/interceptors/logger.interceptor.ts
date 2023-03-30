import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';
import { getRequestContext } from '../requestContext';
interface Response<T> {
  data: T;
}

// https://docs.nestjs.com/interceptors
@Injectable()
export class LoggerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const ctx = getRequestContext(request);

    return next.handle().pipe(
      tap((data) => {
        this.logger.info('response', {
          responseData: data,
          req: ctx,
        });
      }),
    );
  }
}
