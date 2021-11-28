import { Controller, HttpResponse } from '@/controllers';
import { EntryData } from '@/entities/data-transfer-objects';
import { CategoryMysqlRepository, EntryMysqlRepository } from '@/repositories/implementations';
import { CreateEntryUseCase } from '@/usecases/create-entry';
import { HttpHelper } from '../helpers';

export class CreateEntryController implements Controller {
  private createEntry = new CreateEntryUseCase(new EntryMysqlRepository(), new CategoryMysqlRepository());
  async handler(request: EntryData): Promise<HttpResponse> {
    const createEntryOrError = await this.createEntry.execute(request);
    if (createEntryOrError.isLeft()) {
      return HttpHelper.badRequest(createEntryOrError.value);
    }
    return HttpHelper.created({ message: 'ok' });
  }
}
