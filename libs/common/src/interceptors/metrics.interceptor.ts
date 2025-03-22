import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from '../metrics/metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const isHttp = context.getType() === 'http';
    const isRpc = context.getType() === 'rpc';

    let method: string, route: string, pattern: string;

    if (isHttp) {
      const request = context.switchToHttp().getRequest();
      method = request.method;
      route = request.url;
    } else if (isRpc) {
      pattern = context.getArgByIndex(1)?.['pattern'] || 'unknown'; // Get message pattern
    }

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = (Date.now() - start) / 1000;
          if (isHttp) {
            const response = context.switchToHttp().getResponse();
            this.metricsService.recordHttpRequestDuration(
              method,
              route,
              response.statusCode,
              duration,
            );
          } else if (isRpc) {
            this.metricsService.recordRpcRequestDuration(
              pattern,
              '200',
              duration,
            );
          }
        },
        error: (err) => {
          const duration = (Date.now() - start) / 1000;
          if (isHttp) {
            this.metricsService.recordHttpRequestDuration(
              method,
              route,
              err.status || 500,
              duration,
            );
          } else if (isRpc) {
            this.metricsService.recordRpcRequestDuration(
              pattern,
              err.status || '500',
              duration,
            );
          }
        },
      }),
    );
  }
}