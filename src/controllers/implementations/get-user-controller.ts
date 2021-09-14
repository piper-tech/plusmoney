import { Controller, HttpResponse } from '@/controllers';
import { UserMysqlRepository } from '@/repositories/implementations';
import { HttpHelper } from '@/controllers/helpers';
import { GetUserData } from '@/usecases/get-user/get-user-data';
import { GetUserUseCase } from '@/usecases/get-user/get-user';

export class GetUserController implements Controller {
  private getUser = new GetUserUseCase(new UserMysqlRepository());

  async handler(request: GetUserData): Promise<HttpResponse> {
    const userOrError = await this.getUser.execute(request);
    if (userOrError.isLeft()) {
      return HttpHelper.badRequest(userOrError.value);
    }
    return HttpHelper.ok(userOrError.value);
  }
}
