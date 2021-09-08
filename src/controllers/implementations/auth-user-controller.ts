import { Controller, HttpResponse } from '@/controllers';
import { AuthData } from '@/providers/auth-provider';
import { AuthenticateUserUseCase } from '@/usecases/auth-user';
import { UserMysqlRepository } from '@/repositories/implementations';
import { AuthenticationJwt } from '@/providers/implementations/auth-jwt';
import { HttpHelper } from '@/controllers/helpers';

export class AuthenticateUserController implements Controller {
  private authenticateUser = new AuthenticateUserUseCase(new AuthenticationJwt(), new UserMysqlRepository());

  async handler(request: AuthData): Promise<HttpResponse> {
    try {
      const authResponseOrError = await this.authenticateUser.execute(request);
      if (authResponseOrError.isLeft()) {
        return HttpHelper.unauthorized(authResponseOrError.value);
      }
      return HttpHelper.ok(authResponseOrError.value);
    } catch {
      return HttpHelper.serverError();
    }
  }
}
