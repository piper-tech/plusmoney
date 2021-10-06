import { CategoryRepository } from '@/repositories';
import { left, right } from '@/shared';
import { GetCategoryData } from '.';
import { GetCategoryResponse } from './get-category-response';

export class GetCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(data: GetCategoryData): Promise<GetCategoryResponse> {
    if (!data.userId) {
      return left(new Error('missing params'));
    }
    const categoriesOrError = await this.categoryRepository.find(data);
    if (categoriesOrError.isLeft()) {
      return left(categoriesOrError.value);
    }
    const categories = categoriesOrError.value;
    return right(categories);
  }
}
