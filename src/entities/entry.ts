import { Either, right, left } from '@/shared';
import { InvalidEntryError } from './errors/invalid-entry-error';

export class Entry {
  private description: string;
  private value: number;
  private entryDate: Date;

  private constructor(description: string, value: number, entryDate: Date) {
    this.description = description;
    this.value = value;
    this.entryDate = entryDate;
  }

  static create(description: string, value: number, entryDate: Date): Either<InvalidEntryError, Entry> {
    if (!description) {
      return left(new InvalidEntryError());
    }
    if (!value) {
      return left(new InvalidEntryError());
    }
    if (!entryDate) {
      return left(new InvalidEntryError());
    }
    return right(new Entry(description, value, entryDate));
  }
}
