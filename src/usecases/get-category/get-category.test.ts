import { UserData, CategoryData } from '@/entities/data-transfer-objects';
import { UserMemoryRepository, CategoryMemoryRepository } from '@/repositories/implementations';
import { GetCategoryUseCase } from './get-category';

describe('get-user', () => {
  it('should return a category', async () => {
    const userData: UserData = { name: 'teste', email: 'teste@gmail.com' };
    const userMemoryRepository = new UserMemoryRepository();
    const userOrError = await userMemoryRepository.save(userData);
    if (userOrError.isLeft()) {
      expect(true).toBe(false);
      return;
    }
    const user = userOrError.value;
    const categoryData: CategoryData = { userId: user.id as number, description: 'teste' };
    const categoryMemoryRepository = new CategoryMemoryRepository();
    await categoryMemoryRepository.save(categoryData);
    const getCategoryUseCase = new GetCategoryUseCase(categoryMemoryRepository);
    const categoriesOrError = await getCategoryUseCase.execute(categoryData);
    if (categoriesOrError.isLeft()) {
      expect(true).toBe(false);
      return;
    }
    console.log(categoriesOrError.value);
    expect(categoriesOrError.isRight()).toBeTruthy();
  });
});
