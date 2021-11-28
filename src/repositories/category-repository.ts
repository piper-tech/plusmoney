import { CategoryData } from '@/entities/data-transfer-objects/category-data';
import { Either } from '@/shared';
import { GetCategoryData } from '@/usecases/get-category';
import { SaveError } from './errors';

export type CategorySaveResponse = Either<SaveError, CategoryData>;
export type CategoryFindResponse = Either<Error, CategoryData[]>;
export type CategoryUpdateResponse = Either<Error, CategoryData>;
export type CategoryDeleteResponse = Either<Error, number>;

export interface CategoryRepository {
  save(data: CategoryData): Promise<CategorySaveResponse>
  find(data: GetCategoryData): Promise<CategoryFindResponse>;
  update(data: CategoryData): Promise<CategoryUpdateResponse>;
  delete(id: number): Promise<CategoryDeleteResponse>;
}
