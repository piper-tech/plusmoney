import { UseCaseError } from '.';

export class EntryNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('entries not found');
    this.name = 'EntryNotFoundError';
  }
}
