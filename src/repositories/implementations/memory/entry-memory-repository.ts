import { EntryData } from '@/entities/data-transfer-objects';
import {
  EntryRepository,
  EntrySaveResponse,
  EntryGenericResponse,
  EntryUpdateResponse,
  EntryDeleteResponse
} from '@/repositories';
import { left, right } from '@/shared';
import { GetEntryData } from '@/usecases/get-entry';

export class EntryMemoryRepository implements EntryRepository {
  private entryData: EntryData[] = [];

  async save(data: EntryData): Promise<EntrySaveResponse> {
    data.id = this.entryData.length + 1;
    this.entryData.push(data);
    return right(data);
  }

  async find(data: GetEntryData): Promise<EntryGenericResponse> {
    const entries = this.entryData.filter(entryData => entryData.userId === data.userId);
    if (!entries || entries.length === 0) {
      return left(new Error());
    }
    return right(entries);
  }

  async update(data: EntryData): Promise<EntryUpdateResponse> {
    this.entryData.forEach((entry) => {
      if (entry.id === data.id) {
        entry = data;
      }
    });
    return right(data);
  }

  async delete(id: number): Promise<EntryDeleteResponse> {
    return right(0);
  }
}
