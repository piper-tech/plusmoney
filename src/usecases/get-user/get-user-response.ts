import { Either } from '@/shared';
import { UserNotFoundError } from '@/usecases/errors';
import { GetUserData } from './get-user-data';

export type GetUserResponse = Either<UserNotFoundError, GetUserData>
