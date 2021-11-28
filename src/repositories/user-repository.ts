import { UserData } from '@/entities/data-transfer-objects';
import { Either } from '@/shared';
import { SaveError, FindByEmailError, FindByIdError } from './errors';

export type UserSaveResponse = Either<SaveError, UserData>;
export type UserFindByEmailResponse = Either<FindByEmailError, UserData>;
export type UserFindByIdResponse = Either<FindByIdError, UserData>;

export interface UserRepository {
  save(data: UserData): Promise<UserSaveResponse>;
  findByEmail(email: string): Promise<UserFindByEmailResponse>;
  findById(id:number): Promise<UserFindByIdResponse>;
}
