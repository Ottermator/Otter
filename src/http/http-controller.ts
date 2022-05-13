import * as e from 'express';

import {HttpAction} from 'src/http/http-action';
import {Controller} from 'src/http/coerce/controller';
import {HttpErrorPattern} from 'src/http/http-error-pattern';

export class HttpController {
  private readonly actions: Array<HttpAction>;
  private readonly errorPatterns: Array<HttpErrorPattern>;

  constructor({ actions, errors }: Controller) {
    this.actions = actions.map(action => new HttpAction(action));
    this.errorPatterns = errors;
  }

  register(
    app: e.Express,
    prefix: string,
    errorPatterns: Array<HttpErrorPattern>,
  ) {
    this.actions.forEach(action => action.registerWith(
      app,
      prefix,
      // Locally-bound errors have higher precedence than globally-bound ones
      [
        ...this.errorPatterns,
        ...errorPatterns,
      ],
    ));
  }
}
