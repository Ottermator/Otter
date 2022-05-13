import {HttpOptions} from './http-options';
import * as express from 'express';
import {json} from 'body-parser';
import {discoverHttpControllers} from './discover-http-controllers';

export async function startHttpServer(options: HttpOptions): Promise<void> {
  const app = express();
  app.use(json());

  await discoverHttpControllers(app, options);

  return new Promise((resolve) => {
    app.listen(options.port, () => {
      console.log(`[otter:http] Initialized and listening on port ${options.port}`)
      resolve();
    });
  });
}
