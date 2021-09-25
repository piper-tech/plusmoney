import { CategoryData } from '@/entities/data-transfer-objects';
import { CategoryRepository, SaveResponse } from '@/repositories/category-repository';
import { right } from '@/shared';

export class CategoryMemoryRepository implements CategoryRepository {
  private categoryData: CategoryData[] = [];

  async save(data: CategoryData): Promise<SaveResponse> {
    this.categoryData.push(data);
    return right(data);
  }
}
