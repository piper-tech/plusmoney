import { CategoryData } from '@/entities/data-transfer-objects';
import { CategoryRepository } from '@/repositories';

export class CategoryMemoryRepository implements CategoryRepository {
  private categoryData: CategoryData[] = [];

  async save(data: CategoryData): Promise<boolean> {
    this.categoryData.push(data);
    return true;
  }
}
