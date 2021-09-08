import { ControllerError } from './controller-error';

export class Unauthorized extends Error implements ControllerError {
  constructor(message: string) {
    super(message);
    this.name = 'Unauthorized';
  }
}
