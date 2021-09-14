import { UseCaseError } from './usecase-error';

export class UserNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('user not found');
    this.name = 'UserNotFound';
  }
}
