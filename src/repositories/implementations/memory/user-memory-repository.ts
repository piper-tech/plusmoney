import { UserData } from '@/entities/data-transfer-objects';
import { FindByEmailError } from '@/repositories/errors';
import { UserRepository, SaveResponse, FindByEmailResponse } from '@/repositories/user-repository';
import { left, right } from '@/shared';

export class UserMemoryRepository implements UserRepository {
    users: UserData[] = []
    async save(data: UserData): Promise<SaveResponse> {
      this.users.push(data);
      return right(data);
    }

    async findByEmail(email: string): Promise<FindByEmailResponse> {
      const user = this.users.find(user => user.email === email);
      return user ? right(user) : left(new FindByEmailError('user not found'));
    }
}
