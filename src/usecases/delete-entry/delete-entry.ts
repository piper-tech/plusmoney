import { EntryRepository } from '@/repositories';
import { left, right } from '@/shared';
import { DeleteEntryData } from './delete-entry-data';
import { DeleteEntryResponse } from './delete-entry-response';

export class DeleteEntryUseCase {
  private entryRepository: EntryRepository;

  constructor(entryRepository: EntryRepository) {
    this.entryRepository = entryRepository;
  }

  async execute(data: DeleteEntryData): Promise<DeleteEntryResponse> {
    if (!data.id) {
      return left(new Error('id not provided'));
    }
    const result = await this.entryRepository.delete(data.id);
    if (result.isLeft()) {
      return left(new Error('there was an error in the database operation'));
    }
    return right(data.id);
  }
}
