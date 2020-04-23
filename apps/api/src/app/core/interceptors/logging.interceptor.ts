import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    // GraphQL context
    context = req ? context : GqlExecutionContext.create(context);

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${Date.now() - now}ms`,
            `${context.getClass().name}.${context.getHandler().name}`
          )
        )
      );
  }
}
