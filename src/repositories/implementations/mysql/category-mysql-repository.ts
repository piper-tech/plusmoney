import { CategoryData } from '@/entities/data-transfer-objects';
import { FindResponse } from '@/repositories';
import { CategoryRepository, DeleteResponse, SaveResponse, UpdateResponse } from '@/repositories/category-repository';
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

  async update(data: CategoryData): Promise<UpdateResponse> {
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

  async delete(id: number): Promise<DeleteResponse> {
    try {
      await knex('categories').where('id', '=', id).del();
      return right(id);
    } catch (error) {
      console.log(error);
      return left(new Error());
    }
  }
}
