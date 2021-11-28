import { CategoryRepository } from '@/repositories';
import { left, right } from '@/shared';
import { DeleteCategoryData, DeleteCategoryResponse } from '.';

export class DeleteCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(data: DeleteCategoryData): Promise<DeleteCategoryResponse> {
    const { id } = data;
    if (!id) {
      return left(new Error('id not provided'));
    }
    if (await this.checkIsUncategorized(data)) {
      return left(new Error('it is not possible to delete this category'));
    }
    const result = await this.categoryRepository.delete(id);
    if (result.isLeft()) {
      return left(new Error('there was an error in the database operation'));
    }
    return right(id);
  }

  private async checkIsUncategorized(data: DeleteCategoryData): Promise<boolean> {
    const categoryOrError = await this.categoryRepository.find({ id: data.id });
    if (categoryOrError.isLeft()) {
      return false;
    }
    const category = categoryOrError.value[0];
    return category.description.toLowerCase() === 'não categorizado';
  }
}
