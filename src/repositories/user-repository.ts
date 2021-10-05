import { UserData } from '@/entities/data-transfer-objects';
import { Either } from '@/shared';
import { SaveError, FindByEmailError, FindByIdError } from './errors';

export type SaveResponse = Either<SaveError, UserData>;
export type FindByEmailResponse = Either<FindByEmailError, UserData>;
export type FindByIdResponse = Either<FindByIdError, UserData>;

export interface UserRepository {
  save(data: UserData): Promise<SaveResponse>;
  findByEmail(email: string): Promise<FindByEmailResponse>;
  findById(id:number): Promise<FindByIdResponse>;
}
