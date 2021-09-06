import { UserData } from '@/entities/data-transfer-objects';
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '@/entities/errors';
import { Either } from '@/shared';
import { EmailAlreadyExistsError } from '@/usecases/errors';

export type CreateUserResponse = Either<EmailAlreadyExistsError | 
InvalidEmailError | 
InvalidNameError | 
InvalidPasswordError, UserData>
