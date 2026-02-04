import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        statusCode,
        message,
        error: HttpStatus[statusCode],
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}

export class ValidationException extends BusinessException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundException extends BusinessException {
  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedException extends BusinessException {
  constructor(message: string = 'Unauthorized access') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends BusinessException {
  constructor(message: string = 'Access forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class ConflictException extends BusinessException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}

export class PaymentRequiredException extends BusinessException {
  constructor(message: string = 'Payment required') {
    super(message, HttpStatus.PAYMENT_REQUIRED);
  }
}

export class ServiceUnavailableException extends BusinessException {
  constructor(message: string = 'Service temporarily unavailable') {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
