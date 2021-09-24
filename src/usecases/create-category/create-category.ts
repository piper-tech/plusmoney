import { Category } from '@/entities';
import { CategoryData } from '@/entities/data-transfer-objects';
import { CategoryRepository } from '@/repositories';
import { left, right } from '@/shared';
import { CreateCategoryResponse } from './';

export class CreateCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(data: CategoryData): Promise<CreateCategoryResponse> {
    const categoryOrError = Category.create(data.description);
    if (categoryOrError.isLeft()) {
      return left(categoryOrError.value);
    }
    await this.categoryRepository.save(data);
    return right(data);
  }
}
