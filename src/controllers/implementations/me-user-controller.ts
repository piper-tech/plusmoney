import { Controller, HttpResponse } from '@/controllers';
import { HttpHelper } from '@/controllers/helpers';
import { AuthData } from '@/providers';
import { AuthenticationJwt } from '@/providers/implementations';
import { UserMysqlRepository } from '@/repositories/implementations';
import { GetUserUseCase } from '@/usecases/get-user/get-user';

export class MeUserController implements Controller {
  private authJwt = new AuthenticationJwt();
  private getUser = new GetUserUseCase(new UserMysqlRepository());

  async handler(request: AuthData): Promise<HttpResponse> {
    const decoded = await this.authJwt.verify(request.accessToken.split(' ')[1]);
    const userOrError = await this.getUser.execute({ id: decoded.userId });
    if (userOrError.isLeft()) {
      return HttpHelper.notFound(userOrError.value);
    }
    return HttpHelper.ok(userOrError.value);
  }
}
