import { UserMemoryRepository } from '@/repositories/implementations';
import { AuthenticationJwt } from '@/providers/implementations';
import { AuthenticateUserUseCase, AuthUserData } from '@/usecases/auth-user';
import { UserData } from '@/entities/data-transfer-objects';

describe('authenticate', () => {
  it('should not authenticate with not existing email', async () => {
    const authUserData: AuthUserData = { email: 'teste2@gmail', password: '123' };
    const userData: UserData = { name: 'teste', email: 'teste@gmail', password: '123' };
    const authJwt = new AuthenticationJwt();
    const userMemoryRepository = new UserMemoryRepository();
    await userMemoryRepository.save(userData);
    const authUseCase = new AuthenticateUserUseCase(authJwt, userMemoryRepository);
    const error = await authUseCase.execute(authUserData);
    expect(error.isLeft()).toBeTruthy();
  });

  it('should not authenticate with invalid password', async () => {
    const authUserData: AuthUserData = { email: 'teste@gmail', password: 'invalid password' };
    const userData: UserData = { name: 'teste', email: 'teste@gmail', password: '123' };
    const authJwt = new AuthenticationJwt();
    const userMemoryRepository = new UserMemoryRepository();
    await userMemoryRepository.save(userData);
    const authUseCase = new AuthenticateUserUseCase(authJwt, userMemoryRepository);
    const error = await authUseCase.execute(authUserData);
    expect(error.isLeft()).toBeTruthy();
  });

  it('should authenticate a valid user', async () => {
    const authUserData: AuthUserData = { email: 'teste@gmail', password: '123' };
    const userData: UserData = { name: 'teste', email: 'teste@gmail', password: '123' };
    const authJwt = new AuthenticationJwt();
    const userMemoryRepository = new UserMemoryRepository();
    await userMemoryRepository.save(userData);
    const authUseCase = new AuthenticateUserUseCase(authJwt, userMemoryRepository);
    const authResponse = await authUseCase.execute(authUserData);
    expect(authResponse.isRight()).toBeTruthy();
    expect(authResponse.value).toHaveProperty('accessToken');
  });
});
