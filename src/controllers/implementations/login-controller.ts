import { Controller, HttpResponse } from '@/controllers';
import { AuthenticateUserUseCase, AuthUserData } from '@/usecases/auth-user';
import { UserMysqlRepository } from '@/repositories/implementations';
import { AuthenticationJwt, BCryptProvider } from '@/providers/implementations';
import { HttpHelper } from '@/controllers/helpers';

export class LoginController implements Controller {
  private authenticateUser = new AuthenticateUserUseCase(
    new AuthenticationJwt(),
    new UserMysqlRepository(),
    new BCryptProvider()
  );

  async handler(request: AuthUserData): Promise<HttpResponse> {
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
