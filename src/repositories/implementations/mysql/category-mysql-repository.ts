import { CategoryData } from '@/entities/data-transfer-objects';
import { FindResponse } from '@/repositories';
import { CategoryRepository, SaveResponse } from '@/repositories/category-repository';
import { SaveError } from '@/repositories/errors';
import { left, right } from '@/shared';
import { GetCategoryData } from '@/usecases/get-category';
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

  async find(data: GetCategoryData): Promise<FindResponse> {
    try {
      console.log(data);
      const categories = await knex('categories').select<CategoryData[]>().where(data);
      if (categories.length === 0) {
        return left(new Error());
      }
      return right(categories);
    } catch (error) {
      console.log(error);
      return left(new Error((error as Error).message));
    }
  }
}
