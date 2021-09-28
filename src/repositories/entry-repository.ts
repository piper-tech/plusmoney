import { EntryData } from '@/entities/data-transfer-objects';
import { Either } from '@/shared';
import { GetEntryData } from '@/usecases/get-entry';
import { SaveError } from './errors';

export type SaveResponse = Either<SaveError, EntryData>;
export type GenericResponse = Either<Error, EntryData[]>;

export interface EntryRepository {
  save(data: EntryData): Promise<SaveResponse>
  find(data: GetEntryData): Promise<GenericResponse>;
}
