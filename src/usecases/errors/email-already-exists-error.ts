import { UseCaseError } from './usecase-error';

export class EmailAlreadyExistsError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`this email ${email} already exists`);
    this.name = 'EmailAlreadyExistsError';
  }
}
