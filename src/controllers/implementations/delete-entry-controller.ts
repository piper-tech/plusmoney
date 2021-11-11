import { EntryMysqlRepository } from '@/repositories/implementations';
import { DeleteEntryUseCase, DeleteEntryData } from '@/usecases/delete-entry';
import { Controller, HttpResponse } from '..';
import { HttpHelper } from '../helpers';

export class DeleteEntryController implements Controller {
  private deleteEntry = new DeleteEntryUseCase(new EntryMysqlRepository());

  async handler(data: DeleteEntryData): Promise<HttpResponse> {
    const deletedOrError = await this.deleteEntry.execute(data);
    if (deletedOrError.isLeft()) {
      return HttpHelper.badRequest(deletedOrError.value);
    }
    return HttpHelper.ok({ id: deletedOrError.value });
  }
}
