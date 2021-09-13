import { EntityError } from '.';

export class InvalidEntryError extends Error implements EntityError {
  constructor() {
    super('this entry is invalid');
    this.name = 'InvalidEntryError';
  }
}
