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
    const result = await this.categoryRepository.delete(id);
    if (result.isLeft()) {
      return left(new Error('there was an error in the database operation'));
    }
    return right(id);
  }
}
