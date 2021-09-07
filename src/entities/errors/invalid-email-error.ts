import { EntityError } from './entity-error';

export class InvalidEmailError extends Error implements EntityError {
  constructor() {
    super('this email is invalid');
    this.name = 'InvalidEmailError';
  }
}
