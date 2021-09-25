import { CategoryData } from '@/entities/data-transfer-objects';
import { CategoryRepository, SaveResponse } from '@/repositories/category-repository';
import { SaveError } from '@/repositories/errors';
import { left, right } from '@/shared';
import knex from './knex';

export class CategoryMysqlRepository implements CategoryRepository {
  async save(data: CategoryData): Promise<SaveResponse> {
    try {
      await knex('categories').insert(data);
      return right(data);
    } catch (error) {
      console.log(error);
      return left(new SaveError((error as Error).message));
    }
  }
}
