import { InvalidEmailError } from '../../entities/errors/invalid-email-error';
import { InvalidNameError } from '../../entities/errors/invalid-name-error';
import { InvalidPasswordError } from '../../entities/errors/invalid-password-error';
import { Either } from '../../shared/either';
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error';
import { CreateUserDTO } from './create-user-dto';

export type CreateUserResponse = Either<EmailAlreadyExistsError | 
InvalidEmailError | 
InvalidNameError | 
InvalidPasswordError, CreateUserDTO>
