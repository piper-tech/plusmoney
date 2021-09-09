import { UseCaseError } from './usecase-error';

export class InvalidCredentials extends Error implements UseCaseError {
  constructor() {
    super('invalid credentials');
    this.name = 'InvalidCredentials';
  }
}
