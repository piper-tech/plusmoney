import { EntryData } from '@/entities/data-transfer-objects';

export interface EntryRepository {
  save(data: EntryData): Promise<boolean>
  // getAll(): Promise<EntryData[]>
}
