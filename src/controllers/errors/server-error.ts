import { ControllerError } from './controller-error';

export class ServerError extends Error implements ControllerError {
  constructor() {
    super('internal server error');
    this.name = 'ServerError';
  }
}
