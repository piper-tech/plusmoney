import { UserData } from '@/entities/data-transfer-objects';
import { FindByEmailError } from '@/repositories/errors';
import {
  UserRepository,
  UserSaveResponse,
  UserFindByEmailResponse,
  UserFindByIdResponse
} from '@/repositories';
import { left, right } from '@/shared';

export class UserMemoryRepository implements UserRepository {
    users: UserData[] = []
    async save(data: UserData): Promise<UserSaveResponse> {
      data.id = this.users.length + 1;
      this.users.push(data);
      return right(data);
    }

    async findByEmail(email: string): Promise<UserFindByEmailResponse> {
      const user = this.users.find(user => user.email === email);
      return user ? right(user) : left(new FindByEmailError('user not found'));
    }

    async findById(id: number): Promise<UserFindByIdResponse> {
      return right({ email: 'none@email.com', name: 'none' });
    }
}
