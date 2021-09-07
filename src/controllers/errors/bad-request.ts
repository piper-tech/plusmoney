import { ControllerError } from './controller-error';

export class BadRequest extends Error implements ControllerError {
  constructor(reason: string) {
    super(reason);
    this.name = 'BadRequest';
  }
}
