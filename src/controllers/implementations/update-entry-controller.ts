import { EntryData } from '@/entities/data-transfer-objects';
import { EntryMysqlRepository } from '@/repositories/implementations';
import { UpdateEntryUseCase } from '@/usecases/update-entry';
import { Controller, HttpResponse } from '..';
import { HttpHelper } from '../helpers';

export class UpdateEntryController implements Controller {
  private updateEntryUseCase = new UpdateEntryUseCase(new EntryMysqlRepository());

  async handler(data: EntryData): Promise<HttpResponse> {
    const updatedOrError = await this.updateEntryUseCase.execute(data);
    if (updatedOrError.isLeft()) {
      return HttpHelper.badRequest(updatedOrError.value);
    }
    return HttpHelper.ok(updatedOrError.value);
  }
}
