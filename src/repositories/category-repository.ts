import { CategoryData } from '@/entities/data-transfer-objects/category-data';
import { Either } from '@/shared';
import { SaveError } from './errors';

export type SaveResponse = Either<SaveError, CategoryData>;

export interface CategoryRepository {
  save(data: CategoryData): Promise<SaveResponse>
}
