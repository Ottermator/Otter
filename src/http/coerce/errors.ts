import {HttpStatus, HttpStatusCode} from 'src/http/http-status';
import {Constructor} from 'ts-morph';

export type Errors = {
  type: 'Errors',
  statusCode: HttpStatusCode,
  errors: Array<Constructor<any>>,
};

export function errors(
  status: HttpStatus | HttpStatusCode,
  ...errors: Array<Constructor<any>>
): Errors {
  return {
    type: 'Errors',
    statusCode: HttpStatusCode.parse(status),
    errors,
  };
}

export function error(
  status: HttpStatus | HttpStatusCode,
  error: Constructor<any>
): Errors {
  return errors(status, error);
}
