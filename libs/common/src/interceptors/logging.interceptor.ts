import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Request');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isHttp = context.getType() === 'http';
    const isRpc = context.getType() === 'rpc';

    let method: string, route: string, pattern: string, requestData: any;

    if (isHttp) {
      const request = context.switchToHttp().getRequest();
      method = request.method;
      route = request.url;
      requestData = request.body;
      this.logger.log(
        `Incoming HTTP ${method} ${route} - Body: ${JSON.stringify(requestData)}`,
      );
    } else if (isRpc) {
      const data = context.getArgByIndex(0); // Payload
      pattern = context.getArgByIndex(1)?.['pattern'] || 'unknown'; // Pattern
      requestData = data;
      this.logger.log(
        `Incoming RPC ${pattern} - Data: ${JSON.stringify(requestData)}`,
      );
    }

    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: (response) => {
          const duration = (Date.now() - start) / 1000;
          if (isHttp) {
            this.logger.log(
              `Completed HTTP ${method} ${route} in ${duration}s - Response: ${JSON.stringify(response)}`,
            );
          } else if (isRpc) {
            this.logger.log(
              `Completed RPC ${pattern} in ${duration}s - Response: ${JSON.stringify(response)}`,
            );
          }
        },
        error: (err) => {
          const duration = (Date.now() - start) / 1000;
          if (isHttp) {
            this.logger.error(
              `Failed HTTP ${method} ${route} in ${duration}s - Error: ${err.message}`,
              err.stack,
            );
          } else if (isRpc) {
            this.logger.error(
              `Failed RPC ${pattern} in ${duration}s - Error: ${err.message}`,
              err.stack,
            );
          }
        },
      }),
    );
  }
}