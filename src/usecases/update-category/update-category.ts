import { Category } from '@/entities';
import { CategoryData } from '@/entities/data-transfer-objects';
import { CategoryRepository } from '@/repositories';
import { left, right } from '@/shared';
import { UpdateCategoryResponse } from './update-category-response';

export class UpdateCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(data: CategoryData): Promise<UpdateCategoryResponse> {
    const categoryOrError = Category.create(data.description);
    if (categoryOrError.isLeft()) {
      return left(categoryOrError.value);
    }
    const successOrError = await this.categoryRepository.update(data);
    if (successOrError.isLeft()) {
      return left(new Error('there was an error in the database operation'));
    }
    delete data.id;
    return right(data);
  }
}
