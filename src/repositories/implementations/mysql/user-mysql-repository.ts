import { UserData } from '@/entities/data-transfer-objects';
import {
  UserRepository,
  UserSaveResponse,
  UserFindByEmailResponse,
  UserFindByIdResponse
} from '@/repositories';
import { SaveError, FindByEmailError, FindByIdError } from '@/repositories/errors';
import { left, right } from '@/shared';
import knex from './knex';

export class UserMysqlRepository implements UserRepository {
  async save(data: UserData): Promise<UserSaveResponse> {
    try {
      const ids = await knex('users').insert(data);
      data.id = ids[0];
      return right(data);
    } catch (error) {
      console.log(error);
      return left(new SaveError((error as Error).message));
    }
  }

  async findByEmail(email: string): Promise<UserFindByEmailResponse> {
    try {
      const user = await knex('users').select().where({ email: email });
      if (!user[0]) {
        return left(new FindByEmailError('user not found'));
      }
      return right(user[0]);
    } catch (error) {
      console.log(error);
      return left(new FindByEmailError('catch'));
    }
  }

  async findById(id: number): Promise<UserFindByIdResponse> {
    try {
      const user = await knex('users').select().where({ id: id });
      console.log(user);
      if (!user[0]) {
        return left(new FindByIdError('user not found'));
      }
      return right(user[0]);
    } catch (error) {
      console.log(error);
      return left(new FindByIdError('catch'));
    }
  }
}
