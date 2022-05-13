import {otter} from 'otter';
import {error} from 'otter/http';
import {AuthenticationError} from './errors/authentication-error';

otter({
  http: {
    port: 8080,
    errors: [
      error(401, AuthenticationError),
    ]
  },
});