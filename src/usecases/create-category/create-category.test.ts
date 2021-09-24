import { CategoryData, UserData } from '@/entities/data-transfer-objects';
import { CategoryMemoryRepository, UserMemoryRepository } from '@/repositories/implementations';
import { CreateCategoryUseCase } from '.';
import { CreateUserUseCase } from '../create-user';

describe('create-category', () => {
  describe('in memory', () => {
    it('should create a category', async () => {
      const userData: UserData = { email: 'teste', name: 'teste', password: '123' };
      const userMemoryRepository = new UserMemoryRepository();
      const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
      await createUserUseCase.execute(userData);

      const categoryData: CategoryData = { idUser: '1', description: 'aluguel' };
      const categoryMemoryRepository = new CategoryMemoryRepository();
      const createCategoryUseCase = new CreateCategoryUseCase(categoryMemoryRepository);
      const success = await createCategoryUseCase.execute(categoryData);
      expect(success.isRight()).toBeTruthy();
    });
  });
});
