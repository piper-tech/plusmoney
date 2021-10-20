import { EntryData } from '@/entities/data-transfer-objects';
import { GenericResponse } from '@/repositories';
import { EntryRepository, SaveResponse, UpdateResponse } from '@/repositories/entry-repository';
import { left, right } from '@/shared';
import { GetEntryData } from '@/usecases/get-entry';

export class EntryMemoryRepository implements EntryRepository {
  private entryData: EntryData[] = [];

  async save(data: EntryData): Promise<SaveResponse> {
    data.id = this.entryData.length + 1;
    this.entryData.push(data);
    return right(data);
  }

  async find(data: GetEntryData): Promise<GenericResponse> {
    const entries = this.entryData.filter(entryData => entryData.userId === data.userId);
    if (!entries || entries.length === 0) {
      return left(new Error());
    }
    return right(entries);
  }

  async update(data: EntryData): Promise<UpdateResponse> {
    this.entryData.forEach((entry) => {
      if (entry.id === data.id) {
        entry = data;
      }
    });
    return right(data);
  }
}
