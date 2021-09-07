import { EntityError } from './entity-error';

export class InvalidNameError extends Error implements EntityError {
  constructor() {
    super('this name is invalid');
    this.name = 'InvalidNameError';
  }
}
