import { Either, right, left } from '@/shared';
import { InvalidEntryError } from './errors/invalid-entry-error';

export class Entry {
  private value: number;
  private entryDate: Date;

  private constructor(value: number, entryDate: Date) {
    this.value = value;
    this.entryDate = entryDate;
  }

  static create(value: number, entryDate: Date): Either<InvalidEntryError, Entry> {
    if (!value) {
      return left(new InvalidEntryError());
    }
    if (!entryDate) {
      return left(new InvalidEntryError());
    }
    return right(new Entry(value, entryDate));
  }
}
