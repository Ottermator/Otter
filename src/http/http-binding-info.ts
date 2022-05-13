import {HttpMethod} from '../types';

export type HttpBindingInfo<TParams extends string> = {
  type: 'http';
  route: {
    method: HttpMethod,
    path: string;
  };
}

