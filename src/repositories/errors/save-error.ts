import { RepositoryError } from './repository-error';

export class SaveError extends Error implements RepositoryError {
  constructor(message: string) {
    super(`SaveError: ${message}`);
    this.name = 'SaveError';
  }
}
