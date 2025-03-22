import { Injectable } from '@nestjs/common';
import * as promClient from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly httpRequestDuration: promClient.Histogram<string>;
  private readonly rpcRequestDuration: promClient.Histogram<string>;

  constructor() {
    promClient.collectDefaultMetrics(); // Default Node.js metrics

    this.httpRequestDuration = new promClient.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5],
    });

    this.rpcRequestDuration = new promClient.Histogram({
      name: 'rpc_request_duration_seconds',
      help: 'Duration of RPC (microservice) requests in seconds',
      labelNames: ['pattern', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5],
    });
  }

  getRegistry() {
    return promClient.register;
  }

  recordHttpRequestDuration(
    method: string,
    route: string,
    status: number,
    duration: number,
  ) {
    this.httpRequestDuration
      .labels(method, route, String(status))
      .observe(duration);
  }
  recordRpcRequestDuration(pattern: string, status: string, duration: number) {
    this.rpcRequestDuration.labels(pattern, status).observe(duration);
  }
}
