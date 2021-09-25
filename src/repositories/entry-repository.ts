import { EntryData } from '@/entities/data-transfer-objects';
import { Either } from '@/shared';
import { SaveError } from './errors';

export type SaveResponse = Either<SaveError, EntryData>;

export interface EntryRepository {
  save(data: EntryData): Promise<SaveResponse>
  // getAll(): Promise<EntryData[]>
}
