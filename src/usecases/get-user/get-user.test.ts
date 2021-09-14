import { UserData } from '@/entities/data-transfer-objects';
import { UserMemoryRepository } from '@/repositories/implementations';
import { GetUserUseCase } from './get-user';
import { GetUserData } from './get-user-data';

describe('get-user', () => {
  it('should return a user', async () => {
    const userData: UserData = { name: 'teste', email: 'teste@gmail.com' };
    const userMemoryRepository = new UserMemoryRepository();
    await userMemoryRepository.save(userData);
    const getUserData: GetUserData = { email: 'teste@gmail.com' };
    const getUser = new GetUserUseCase(userMemoryRepository);
    const userOrError = await getUser.execute(getUserData);
    expect(userOrError.isRight()).toBeTruthy();
  });

  it('should not return a user', async () => {
    const userData: UserData = { name: 'teste', email: 'teste@gmail.com' };
    const userMemoryRepository = new UserMemoryRepository();
    await userMemoryRepository.save(userData);
    const getUserData: GetUserData = { email: 'invalid@gmail.com' };
    const getUser = new GetUserUseCase(userMemoryRepository);
    const userOrError = await getUser.execute(getUserData);
    expect(userOrError.isLeft()).toBeTruthy();
  });
});
