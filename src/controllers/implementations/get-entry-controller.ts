import { Controller, HttpResponse } from '@/controllers';
import { CategoryMysqlRepository, EntryMysqlRepository } from '@/repositories/implementations';
import { GetCategoryUseCase } from '@/usecases/get-category';
import { GetEntryData, GetEntryUseCase } from '@/usecases/get-entry';
import { HttpHelper } from '../helpers';

export class GetEntryController implements Controller {
  private getEntry = new GetEntryUseCase(new EntryMysqlRepository());
  private getCategory = new GetCategoryUseCase(new CategoryMysqlRepository());

  async handler(request: GetEntryData): Promise<HttpResponse> {
    const getEntryOrError = await this.getEntry.execute(request);
    if (getEntryOrError.isLeft()) {
      return HttpHelper.badRequest(getEntryOrError.value);
    }
    const entries = await Promise.all(
      getEntryOrError.value.map(async (entry) => {
        const categoryOrError = await this.getCategory.execute({ id: entry.categoryId as number, userId: entry.userId });
        if (categoryOrError.isLeft()) {
          entry.category = { description: 'Não categorizado' };
        } else {
          const category = categoryOrError.value[0];
          entry.category = { description: category.description };
        }
        delete entry.userId;
        entry.category.id = entry.categoryId;
        delete entry.categoryId;
        return entry;
      })
    );
    return HttpHelper.ok(entries);
  }
}
