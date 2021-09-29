import { Controller, HttpResponse } from '@/controllers';
import { EntryMysqlRepository } from '@/repositories/implementations';
import { GetEntryData, GetEntryUseCase } from '@/usecases/get-entry';
import { HttpHelper } from '../helpers';

export class GetEntryController implements Controller {
  private getEntry = new GetEntryUseCase(new EntryMysqlRepository());

  async handler(request: GetEntryData): Promise<HttpResponse> {
    const getEntryOrError = await this.getEntry.execute(request);
    if (getEntryOrError.isLeft()) {
      return HttpHelper.badRequest(getEntryOrError.value);
    }
    const entries = getEntryOrError.value;
    return HttpHelper.ok(entries);
  }
}
