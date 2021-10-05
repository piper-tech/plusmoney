import { AuthData } from '@/providers';
import { Either } from '@/shared';
import { InvalidCredentials } from '@/usecases/errors';

export type AuthenticateUserResponse = Either<InvalidCredentials, AuthData>
