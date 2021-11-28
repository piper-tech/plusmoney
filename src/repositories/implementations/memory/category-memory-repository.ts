import { CategoryData } from '@/entities/data-transfer-objects';
import {
  CategoryRepository,
  CategorySaveResponse,
  CategoryFindResponse,
  CategoryUpdateResponse,
  CategoryDeleteResponse
} from '@/repositories';
import { left, right } from '@/shared';
import { GetCategoryData } from '@/usecases/get-category';

export class CategoryMemoryRepository implements CategoryRepository {
  private categoryData: CategoryData[] = [];

  async save(data: CategoryData): Promise<CategorySaveResponse> {
    this.categoryData.push(data);
    return right(data);
  }

  async find(data: GetCategoryData): Promise<CategoryFindResponse> {
    const categories = this.categoryData.filter(category =>
      category.description === data.description ||
      category.userId === data.userId
    );
    if (categories.length === 0) {
      return left(new Error());
    }
    return right(categories);
  }

  async update(data: CategoryData): Promise<CategoryUpdateResponse> {
    this.categoryData.forEach((category) => {
      if (category.id === data.id) {
        category = data;
      }
    });
    return right(data);
  }

  async delete(id: number): Promise<CategoryDeleteResponse> {
    return right(0);
  }
}
