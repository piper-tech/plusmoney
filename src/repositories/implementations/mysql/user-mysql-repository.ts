import { UserData } from '@/entities/data-transfer-objects';
import { UserRepository, SaveResponse, FindByEmailResponse } from '@/repositories';
import { SaveError, FindByEmailError } from '@/repositories/errors';
import { left, right } from '@/shared';
import knex from './knex';

export class UserMysqlRepository implements UserRepository {
  async save(data: UserData): Promise<SaveResponse> {
    try {
      await knex('users').insert(data);
      return right(data);
    } catch (error) {
      return left(new SaveError((error as Error).message));
    }
  }

  async findByEmail(email: string): Promise<FindByEmailResponse> {
    try {
      const user = await knex('users').select().where({ email: email });
      return right(user[0]);
    } catch (error) {
      console.log(error);
      return left(new FindByEmailError((error as Error).message));
    }
  }
}
