import { CategoryData } from '@/entities/data-transfer-objects';
import { FindResponse } from '@/repositories';
import { CategoryRepository, DeleteResponse, SaveResponse, UpdateResponse } from '@/repositories/category-repository';
import { left, right } from '@/shared';
import { GetCategoryData } from '@/usecases/get-category';

export class CategoryMemoryRepository implements CategoryRepository {
  private categoryData: CategoryData[] = [];

  async save(data: CategoryData): Promise<SaveResponse> {
    this.categoryData.push(data);
    return right(data);
  }

  async find(data: GetCategoryData): Promise<FindResponse> {
    const categories = this.categoryData.filter(category =>
      category.description === data.description ||
      category.userId === data.userId
    );
    if (categories.length === 0) {
      return left(new Error());
    }
    return right(categories);
  }

  async update(data: CategoryData): Promise<UpdateResponse> {
    this.categoryData.forEach((category) => {
      if (category.id === data.id) {
        category = data;
      }
    });
    return right(data);
  }

  async delete(id: number): Promise<DeleteResponse> {
    return right(0);
  }
}
