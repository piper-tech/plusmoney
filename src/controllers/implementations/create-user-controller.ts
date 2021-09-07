import { Controller, HttpResponse } from '@/controllers';
import { UserData } from '@/entities/data-transfer-objects';
import { CreateUserUseCase } from '@/usecases/create-user';
import { UserMysqlRepository } from '@/repositories/implementations';
import { HttpHelper } from '@/controllers/helpers';

export class CreateUserController implements Controller {
  private createUser = new CreateUserUseCase(new UserMysqlRepository());

  async handler(request: UserData): Promise<HttpResponse> {
    const createUserOrError = await this.createUser.execute(request);
    if (createUserOrError.isLeft()) {
      return HttpHelper.badRequest(createUserOrError.value);
    }
    return HttpHelper.created({ message: 'ok' });
  }
}
