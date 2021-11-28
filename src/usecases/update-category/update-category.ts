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
    if (await this.checkIsUncategorized(data)) {
      return left(new Error('it is not possible to edit this category'));
    }
    const successOrError = await this.categoryRepository.update(data);
    if (successOrError.isLeft()) {
      return left(new Error('there was an error in the database operation'));
    }
    delete data.id;
    return right(data);
  }

  private async checkIsUncategorized(data: CategoryData): Promise<boolean> {
    const categoryOrError = await this.categoryRepository.find({ id: data.id });
    if (categoryOrError.isLeft()) {
      return false;
    }
    const category = categoryOrError.value[0];
    return category.description.toLowerCase() === 'não categorizado';
  }
}
