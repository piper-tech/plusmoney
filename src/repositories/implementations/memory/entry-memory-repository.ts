import { EntryData } from '@/entities/data-transfer-objects';
import { EntryRepository, SaveResponse } from '@/repositories/entry-repository';
import { right } from '@/shared';

export class EntryMemoryRepository implements EntryRepository {
  private entryData: EntryData[] = [];
  async save(data: EntryData): Promise<SaveResponse> {
    this.entryData.push(data);
    return right(data);
  }
}
