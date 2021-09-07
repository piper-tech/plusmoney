import { EntityError } from './entity-error';

export class InvalidPasswordError extends Error implements EntityError {
  constructor() {
    super('this password is invalid');
    this.name = 'InvalidPasswordError';
  }
}
