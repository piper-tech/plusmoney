import { EntityError } from '.';

export class InvalidCategoryError extends Error implements EntityError {
  constructor() {
    super('invalid category');
    this.name = 'InvalidCategoryError';
  }
}
