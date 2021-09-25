import { Controller, HttpResponse } from '@/controllers';
import { CategoryData } from '@/entities/data-transfer-objects';
import { CategoryMysqlRepository } from '@/repositories/implementations';
import { CreateCategoryUseCase } from '@/usecases/create-category';
import { HttpHelper } from '../helpers';

export class CreateCategoryController implements Controller {
  private createCategory = new CreateCategoryUseCase(new CategoryMysqlRepository());

  async handler(request: CategoryData): Promise<HttpResponse> {
    const createCategoryOrError = await this.createCategory.execute(request);
    if (createCategoryOrError.isLeft()) {
      return HttpHelper.badRequest(createCategoryOrError.value);
    }
    return HttpHelper.created({ message: 'ok' });
  }
}
