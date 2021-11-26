import { Either, right, left } from '@/shared';
import { InvalidEntryError } from './errors/invalid-entry-error';

export class Entry {
  private description: string;
  private value: number;
  private entryDate: string;

  private constructor(description: string, value: number, entryDate: string) {
    this.description = description;
    this.value = value;
    this.entryDate = entryDate;
  }

  get date() {
    return this.entryDate;
  }

  static create(description: string, value: number, entryDate: string): Either<InvalidEntryError, Entry> {
    if (!description) {
      return left(new InvalidEntryError());
    }
    if (!value) {
      return left(new InvalidEntryError());
    }
    if (!entryDate) {
      return left(new InvalidEntryError());
    }
    entryDate = Entry.validateDate(entryDate);
    return right(new Entry(description, value, entryDate));
  }

  static validateDate(date: string) {
    if (date.match('T')) {
      return date.split('T')[0];
    }
    return date;
  }
}
