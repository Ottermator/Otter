import {HttpStatusCode} from 'src/http/http-status';
import {Constructor} from 'ts-morph';
import {Errors} from 'src/http/coerce';

export type HttpErrorPattern = {
  statusCode: HttpStatusCode;
  error: Constructor<any>;
};

export namespace HttpErrorPattern {
  export function from({ statusCode, errors }: Errors): Array<HttpErrorPattern> {
    return errors.map(error => ({ statusCode, error }));
  }

  export function fromMany(errors: Array<Errors>): Array<HttpErrorPattern> {
    return errors.map(HttpErrorPattern.from).flat();
  }
}