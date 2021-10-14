import { Entry } from '@/entities';
import { EntryData } from '@/entities/data-transfer-objects';
import { EntryRepository } from '@/repositories';
import { left, right } from '@/shared';
import { CreateEntryResponse } from './create-entry-response';

export class CreateEntryUseCase {
  private entryRepository: EntryRepository
  constructor(entryRepository: EntryRepository) {
    this.entryRepository = entryRepository;
  }

  async execute(data: EntryData): Promise<CreateEntryResponse> {
    const entryOrError = Entry.create(data.description, data.value, data.date);
    if (entryOrError.isLeft()) {
      return left(entryOrError.value);
    }
    if (!data.userId) {
      return left(new Error('user id not provided'));
    }
    if (!data.categoryId) {
      delete data.categoryId;
    }
    await this.entryRepository.save(data);
    return right(data);
  }
}
