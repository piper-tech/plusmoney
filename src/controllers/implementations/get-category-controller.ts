import { Controller, HttpResponse } from '@/controllers';
import { CategoryMysqlRepository } from '@/repositories/implementations';
import { GetCategoryData, GetCategoryUseCase } from '@/usecases/get-category';
import { HttpHelper } from '../helpers';

export class GetCategoryController implements Controller {
  private getCategory = new GetCategoryUseCase(new CategoryMysqlRepository());

  async handler(request: GetCategoryData): Promise<HttpResponse> {
    const getCategoryOrError = await this.getCategory.execute(request);
    if (getCategoryOrError.isLeft()) {
      return HttpHelper.ok([]);
    }
    const categories = getCategoryOrError.value;
    categories.forEach(category => {
      delete category.userId;
    });
    return HttpHelper.ok(categories);
  }
}
