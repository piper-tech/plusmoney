import { ControllerError } from './controller-error';

export class ServerError extends Error implements ControllerError {
  constructor(reason: string) {
    super(`server error: ${reason}`);
    this.name = 'ServerError';
  }
}
