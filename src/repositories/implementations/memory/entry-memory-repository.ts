import { EntryData } from '@/entities/data-transfer-objects';
import { EntryRepository } from '@/repositories/entry-repository';

export class EntryMemoryRepository implements EntryRepository {
  private entryData: EntryData[] = [];
  async save(data: EntryData): Promise<boolean> {
    this.entryData.push(data);
    return true;
  }
}
