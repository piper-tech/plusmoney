import { EntryData } from '@/entities/data-transfer-objects';
import { Either } from '@/shared';
import { GetEntryData } from '@/usecases/get-entry';
import { SaveError } from './errors';

export type EntrySaveResponse = Either<SaveError, EntryData>;
export type EntryGenericResponse = Either<Error, EntryData[]>;
export type EntryUpdateResponse = Either<Error, EntryData>;
export type EntryDeleteResponse = Either<Error, number>;

export interface EntryRepository {
  save(data: EntryData): Promise<EntrySaveResponse>
  find(data: GetEntryData): Promise<EntryGenericResponse>;
  update(data: EntryData): Promise<EntryUpdateResponse>;
  delete(id: number): Promise<EntryDeleteResponse>;
}
