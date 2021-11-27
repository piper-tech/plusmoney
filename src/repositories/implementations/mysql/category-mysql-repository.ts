import { CategoryData } from '@/entities/data-transfer-objects';
import {
  CategoryRepository,
  CategorySaveResponse,
  CategoryFindResponse,
  CategoryUpdateResponse,
  CategoryDeleteResponse
} from '@/repositories';
import { SaveError } from '@/repositories/errors';
import { left, right } from '@/shared';
import { GetCategoryData } from '@/usecases/get-category';
import knex from './knex';

export class CategoryMysqlRepository implements CategoryRepository {
  async save(data: CategoryData): Promise<CategorySaveResponse> {
    try {
      await knex('categories').insert(data);
      return right(data);
    } catch (error) {
      console.log(error);
      return left(new SaveError((error as Error).message));
    }
  }

  async find(data: GetCategoryData): Promise<CategoryFindResponse> {
    try {
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

  async update(data: CategoryData): Promise<CategoryUpdateResponse> {
    try {
      const affected = await knex('categories').where('id', '=', data.id as number).update(data);
      if (affected === 0) {
        return left(new Error('Category not found'));
      }
      return right(data);
    } catch (error) {
      console.log(error);
      return left(new Error());
    }
  }

  async delete(id: number): Promise<CategoryDeleteResponse> {
    try {
      await knex('categories').where('id', '=', id).del();
      return right(id);
    } catch (error) {
      console.log(error);
      return left(new Error());
    }
  }
}
