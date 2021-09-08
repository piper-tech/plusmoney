import { UserMemoryRepository } from '@/repositories/implementations';
import { AuthenticationJwt } from '@/providers/implementations';
import { AuthenticateUserUseCase } from '@/usecases/auth-user';
import { AuthData } from '@/providers';
import { UserData } from '@/entities/data-transfer-objects';

describe('authenticate', () => {
  it('should not authenticate with not existing email', async () => {
    const authData: AuthData = { email: 'teste2@gmail', password: '123' };
    const userData: UserData = { name: 'teste', email: 'teste@gmail', password: '123' };
    const authJwt = new AuthenticationJwt();
    const userMemoryRepository = new UserMemoryRepository();
    await userMemoryRepository.save(userData);
    const authUseCase = new AuthenticateUserUseCase(authJwt, userMemoryRepository);
    const error = await authUseCase.execute(authData);
    expect(error.isLeft()).toBeTruthy();
  });

  it('should not authenticate with invalid password', async () => {
    const authData: AuthData = { email: 'teste@gmail', password: 'invalid password' };
    const userData: UserData = { name: 'teste', email: 'teste@gmail', password: '123' };
    const authJwt = new AuthenticationJwt();
    const userMemoryRepository = new UserMemoryRepository();
    await userMemoryRepository.save(userData);
    const authUseCase = new AuthenticateUserUseCase(authJwt, userMemoryRepository);
    const error = await authUseCase.execute(authData);
    expect(error.isLeft()).toBeTruthy();
  });

  it('should authenticate a valid user', async () => {
    const authData: AuthData = { email: 'teste@gmail', password: '123' };
    const userData: UserData = { name: 'teste', email: 'teste@gmail', password: '123' };
    const authJwt = new AuthenticationJwt();
    const userMemoryRepository = new UserMemoryRepository();
    await userMemoryRepository.save(userData);
    const authUseCase = new AuthenticateUserUseCase(authJwt, userMemoryRepository);
    const authResponse = await authUseCase.execute(authData);
    expect(authResponse.isRight()).toBeTruthy();
    expect(authResponse.value).toHaveProperty('accessToken');
  });
});
