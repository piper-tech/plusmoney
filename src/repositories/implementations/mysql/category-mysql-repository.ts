import { CategoryData } from '@/entities/data-transfer-objects';
import { CategoryRepository } from '@/repositories';
import knex from './knex';

export class CategoryMysqlRepository implements CategoryRepository {
  async save(data: CategoryData): Promise<boolean> {
    try {
      await knex('categories').insert(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
