import { CategoryMysqlRepository } from '@/repositories/implementations';
import { DeleteCategoryData, DeleteCategoryUseCase } from '@/usecases/delete-category';
import { Controller, HttpResponse } from '..';
import { HttpHelper } from '../helpers';

export class DeleteCategoryController implements Controller {
  private deleteCategory = new DeleteCategoryUseCase(new CategoryMysqlRepository());

  async handler(request: DeleteCategoryData): Promise<HttpResponse> {
    const deletedOrError = await this.deleteCategory.execute(request);
    if (deletedOrError.isLeft()) {
      return HttpHelper.badRequest(deletedOrError.value);
    }
    return HttpHelper.ok({ id: deletedOrError.value });
  }
}
