import {ActionPipeline} from 'src/action-pipeline';
import {Route} from './route';
import {Awaitable} from 'src/types';
import {HttpBindingInfo} from 'src/http';

export type Action<
  TInput extends object,
  TOutput,
  TRoute extends Route
  > = {
  route: TRoute;
  handler: (input: TInput) => Awaitable<TOutput>,
}

type HttpActionPipeline<TInput, TOutput, TRoute extends Route> =
  TRoute extends Route<infer _, infer TParamNames>
    ? ActionPipeline<TInput, TOutput, HttpBindingInfo<TParamNames>>
    : unknown;

export function action<TInput extends object, TOutput>(
  {route, handler}: Action<TInput, TOutput, Route>,
): HttpActionPipeline<TInput, TOutput, typeof route> {
  return new ActionPipeline(
    handler,
    { type: 'http', route }
  );
}

