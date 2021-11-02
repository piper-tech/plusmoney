import { CategoryData } from '@/entities/data-transfer-objects';
import { CategoryMysqlRepository } from '@/repositories/implementations';
import { UpdateCategoryUseCase } from '@/usecases/update-category';
import { Controller, HttpResponse } from '..';
import { HttpHelper } from '../helpers';

export class UpdateCategoryController implements Controller {
  private updateCategoryUseCase = new UpdateCategoryUseCase(new CategoryMysqlRepository());

  async handler(data: CategoryData): Promise<HttpResponse> {
    const updatedOrError = await this.updateCategoryUseCase.execute(data);
    if (updatedOrError.isLeft()) {
      return HttpHelper.badRequest(updatedOrError.value);
    }
    return HttpHelper.ok(updatedOrError.value);
  }
}
