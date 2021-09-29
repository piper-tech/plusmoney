import { EntryRepository } from '@/repositories';
import { left, right } from '@/shared';
import { EntryNotFoundError } from '../errors';
import { GetEntryData } from './get-entry-data';
import { GetEntryResponse } from './get-entry-response';

export class GetEntryUseCase {
  private entryRepository;

  constructor(entryRepository: EntryRepository) {
    this.entryRepository = entryRepository;
  }

  async execute(data: GetEntryData): Promise<GetEntryResponse> {
    if (!data.id && !data.userId) {
      return left(new Error('missing params'));
    }
    const entriesOrError = await this.entryRepository.find(data);
    if (entriesOrError.isLeft()) {
      return left(new EntryNotFoundError());
    }
    return right(entriesOrError.value);
  }
}
