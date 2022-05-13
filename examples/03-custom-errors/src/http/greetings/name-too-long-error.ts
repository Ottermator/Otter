export class NameTooLongError extends Error {
  constructor(maxLength: number, length: number) {
    super(`Provided name was too long ${length}, maximum length is ${maxLength}`);
  }
}