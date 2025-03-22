import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express'; // For HTTP (gateway)
import { RpcException } from '@nestjs/microservices'; // For microservices

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Determine if this is an HTTP or RPC (microservice) context
    const isHttp = !!request && !!response;

    if (isHttp) {
      // Handle HTTP exceptions (gateway)
      const status = exception instanceof HttpException ? exception.getStatus() : 500;
      const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

      this.logger.error(
        `HTTP Exception: ${exception}`,
        exception instanceof Error ? exception.stack : '',
      );

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    } else {
      // Handle RPC (microservice) exceptions
      const error = exception instanceof RpcException ? exception.getError() : exception;

      this.logger.error(
        `RPC Exception: ${exception}`,
        exception instanceof Error ? exception.stack : '',
      );

      // For microservices, throw the exception back to the caller
      throw exception instanceof RpcException ? exception : new RpcException('Internal server error');
    }
  }
}