import { Controller, HttpResponse } from '@/controllers';
import { HttpHelper } from '@/controllers/helpers';
import { AuthenticationJwt } from '@/providers/implementations';
import { UserMysqlRepository } from '@/repositories/implementations';
import { GetUserUseCase } from '@/usecases/get-user/get-user';

export class MeUserController implements Controller {
  private authJwt = new AuthenticationJwt();
  private getUser = new GetUserUseCase(new UserMysqlRepository());
  public accessToken: string = '';

  async handler(request: any): Promise<HttpResponse> {
    const decoded = await this.authJwt.verify(this.accessToken.split(' ')[1]);
    const userOrError = await this.getUser.execute({ id: decoded.userId });
    if (userOrError.isLeft()) {
      return HttpHelper.notFound(userOrError.value);
    }
    return HttpHelper.ok(userOrError.value);
  }
}
