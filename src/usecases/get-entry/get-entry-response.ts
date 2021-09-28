import { EntryData } from '@/entities/data-transfer-objects';
import { Either } from '@/shared';
import { EntryNotFoundError } from '../errors';
export type GetEntryResponse = Either<EntryNotFoundError, EntryData[]>
