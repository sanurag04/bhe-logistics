import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const startTime = Date.now();

    // Log incoming request
    this.logger.log(
      `${method} ${url} - ${ip} - ${userAgent}`,
      'Incoming Request',
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const { statusCode } = response;
          const contentLength = this.getContentLength(response);
          const duration = Date.now() - startTime;

          this.logger.log(
            `${method} ${url} ${statusCode} - ${contentLength} - ${duration}ms`,
            'Request Completed',
          );
        },
        error: (error) => {
          const { statusCode } = response;
          const duration = Date.now() - startTime;

          this.logger.error(
            `${method} ${url} ${statusCode} - ${duration}ms - ${error.message}`,
            error.stack,
            'Request Error',
          );
        },
      }),
    );
  }

  private getContentLength(response: Response): string {
    const contentLength = response.get('content-length');
    return contentLength ? `${contentLength} bytes` : '-';
  }
}
