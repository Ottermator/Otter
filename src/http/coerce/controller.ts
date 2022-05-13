import {Errors, HttpController} from 'src/http';
import {HttpPipeline} from 'src/http/http-pipeline';
import {HttpErrorPattern} from 'src/http/http-error-pattern';

type ControllerPart =
  | HttpPipeline
  | Errors;

export type Controller = {
  actions: Array<HttpPipeline>,
  errors: Array<HttpErrorPattern>,
};

function process(controller: Controller, part: ControllerPart): Controller {
  switch (part.type) {
    case 'InvokableActionPipeline': {
      controller.actions.push(part);
      break;
    }

    case 'Errors': {
      HttpErrorPattern.from(part).forEach(e => controller.errors.push(e));
      break;
    }
  }

  return controller;
}

export function controller(...parts: Array<ControllerPart>): HttpController {
  const controller = parts.reduce(process, { actions: [], errors: [] });
  return new HttpController(controller);
}
