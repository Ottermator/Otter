import {action, controller, error, extract, Extract, route} from 'otter/http';
import {checkNameLength} from './check-name-length';
import {AuthenticationError} from '../../errors/authentication-error';
import {NameTooLongError} from './name-too-long-error';

export default controller(
  action({
    route: route('get /check/:name'),
    handler: checkNameLength
  }).before(
    extract(
      Extract.from.url('name')
    )
  ).build(),

  action({
    route: route('get /crash'),
    handler: () => {}
  }).before(
    () => { throw new AuthenticationError() }
  ).build(),

  // there's also an `errors` overload which accepts varargs
  error(400, NameTooLongError),
);