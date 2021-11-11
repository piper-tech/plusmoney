import { CategoryData } from '@/entities/data-transfer-objects/category-data';
import { Either } from '@/shared';
import { GetCategoryData } from '@/usecases/get-category';
import { SaveError } from './errors';

export type SaveResponse = Either<SaveError, CategoryData>;
export type FindResponse = Either<Error, CategoryData[]>;
export type UpdateResponse = Either<Error, CategoryData>;
export type DeleteResponse = Either<Error, number>;

export interface CategoryRepository {
  save(data: CategoryData): Promise<SaveResponse>
  find(data: GetCategoryData): Promise<FindResponse>;
  update(data: CategoryData): Promise<UpdateResponse>;
  delete(id: number): Promise<DeleteResponse>;
}
