import { RepositoryError } from './repository-error';

export class FindByIdError extends Error implements RepositoryError {
  constructor(message: string) {
    super(`FindByIdError: ${message}`);
    this.name = 'FindByIdError';
  }
}
