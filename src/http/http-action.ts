import * as e from 'express';

import {HttpMethod} from 'src/types';
import {HttpStatusCode} from 'src/http';
import {HttpPipeline} from 'src/http/http-pipeline';
import {HttpErrorPattern} from 'src/http/http-error-pattern';

type ActionOutput = {
  status: HttpStatusCode;
  body: any;
};

const successStatusCodes: Record<HttpMethod, HttpStatusCode> = {
  delete: 200,
  get: 200,
  patch: 200,
  post: 201,
  put: 200,
};

export class HttpAction {
  private readonly method = this.action.bindingInfo.route.method;
  private readonly path = this.action.bindingInfo.route.path;

  constructor(private readonly action: HttpPipeline) {
  }

  registerWith(
    app: e.Express,
    prefix: string,
    errorPatterns: Array<HttpErrorPattern>,
  ) {
    const route = `${prefix}${this.path}`;
    console.log(`[otter:http] Registering route ${this.method} ${route}`);

    app[this.method](route, async (req: e.Request, res: e.Response) => {
      const {status, body} = await this
        .onRequest(req)
        .catch(e => this.onError(e, errorPatterns));
      res.status(status).send(JSON.stringify(body));
    });
  }

  async onRequest(req: e.Request): Promise<ActionOutput> {
    // TODO possibly extract response status from output
    return {
      status: successStatusCodes[this.method],
      body: await this.action({req}),
    };
  }

  async onError(error: any, errorPatterns: Array<HttpErrorPattern>): Promise<ActionOutput> {
    function getStatusCode(): HttpStatusCode {
      let match = errorPatterns.find(ep => error.constructor === ep.error)
      if (match) return match.statusCode;

      match = errorPatterns.find(ep => error instanceof ep.error);
      if (match) return match.statusCode;

      return 500;
    }

    function getMessage(): string {
      if (error instanceof Error) {
        return error.message;
      } else {
        return error.toString();
      }
    }

    const status = getStatusCode();
    return {
      status,
      body: {
        status,
        message: getMessage(),
        error: error,
      },
    }
  }
}
