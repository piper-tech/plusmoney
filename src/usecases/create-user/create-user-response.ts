import { Either } from '../../shared/either';
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error';
import { CreateUserDTO } from './create-user-dto';

export type CreateUserResponse = Either<EmailAlreadyExistsError, CreateUserDTO>
