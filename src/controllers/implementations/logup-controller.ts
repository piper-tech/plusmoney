import { Controller, HttpResponse } from '@/controllers';
import { AuthenticateUserUseCase, AuthUserData } from '@/usecases/auth-user';
import { CategoryMysqlRepository, UserMysqlRepository } from '@/repositories/implementations';
import { AuthenticationJwt } from '@/providers/implementations';
import { HttpHelper } from '@/controllers/helpers';
import { CreateUserUseCase } from '@/usecases/create-user';
import { UserData } from '@/entities/data-transfer-objects';

export class LogupController implements Controller {
  private authenticateUser = new AuthenticateUserUseCase(new AuthenticationJwt(), new UserMysqlRepository());
  private createUser = new CreateUserUseCase(new UserMysqlRepository(), new CategoryMysqlRepository());

  async handler(request: UserData): Promise<HttpResponse> {
    try {
      const userOrError = await this.createUser.execute(request);
      if (userOrError.isLeft()) {
        return HttpHelper.badRequest(userOrError.value);
      }
      const authUserData: AuthUserData = {
        email: userOrError.value.email,
        password: userOrError.value.password as string
      };
      const authResponseOrError = await this.authenticateUser.execute(authUserData);
      if (authResponseOrError.isLeft()) {
        return HttpHelper.created({ message: 'user created successfully, but unable to authenticate' });
      }
      return HttpHelper.ok(authResponseOrError.value);
    } catch {
      return HttpHelper.serverError();
    }
  }
}
