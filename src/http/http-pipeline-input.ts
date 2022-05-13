import * as e from 'express';

type Params<TParamNames extends string> = Record<TParamNames, string>;

export type HttpPipelineInput<TParamNames extends string = string> = {
  req: e.Request<Params<TParamNames>>;
}