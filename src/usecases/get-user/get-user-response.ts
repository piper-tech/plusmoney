import { UserData } from '@/entities/data-transfer-objects';
import { Either } from '@/shared';
import { UserNotFoundError } from '@/usecases/errors';

export type GetUserResponse = Either<UserNotFoundError, UserData>
