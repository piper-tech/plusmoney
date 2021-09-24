import { CategoryData } from '@/entities/data-transfer-objects/category-data';

export interface CategoryRepository {
  save(data: CategoryData): Promise<boolean>
}
