import {Errors} from 'src/http/coerce';

export type HttpOptions = {
  port: number;
  errors?: Array<Errors>;
}