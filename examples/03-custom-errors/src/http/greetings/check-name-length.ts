import {NameTooLongError} from './name-too-long-error';

const MaxNameLength = 25 as const;

export function checkNameLength(input: { name: string }) {
  if (input.name.length < MaxNameLength) {
    return 'Your name is good!';
  }

  throw new NameTooLongError(MaxNameLength, input.name.length);
}