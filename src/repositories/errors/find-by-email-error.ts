import { RepositoryError } from './repository-error';

export class FindByEmailError extends Error implements RepositoryError {
  constructor(message: string) {
    super(`FindByEmail: ${message}`);
    this.name = 'FindByEmail';
  }
}
