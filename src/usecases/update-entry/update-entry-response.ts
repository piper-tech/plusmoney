import { Either } from '@/shared';
import { InvalidEntryError } from '@/entities/errors/invalid-entry-error';
import { EntryData } from '@/entities/data-transfer-objects';

export type UpdateEntryResponse = Either<InvalidEntryError, EntryData>
