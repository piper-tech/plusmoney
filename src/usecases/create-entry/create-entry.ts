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
    data.date = entryOrError.value.date;
    data.value = entryOrError.value.entryValue;
    const createdOrError = await this.entryRepository.save(data);
    if (createdOrError.isLeft()) {
      return left(new Error('there was an error in the database operation'));
    }
    return right(data);
  }
}
