import { EntryData } from '@/entities/data-transfer-objects';
import { EntryRepository, SaveResponse, GenericResponse } from '@/repositories/entry-repository';
import { SaveError } from '@/repositories/errors';
import { left, right } from '@/shared';
import { GetEntryData } from '@/usecases/get-entry';
import knex from './knex';

export class EntryMysqlRepository implements EntryRepository {
  async save(data: EntryData): Promise<SaveResponse> {
    try {
      await knex('entries').insert(data);
      return right(data);
    } catch (error) {
      console.log(error);
      return left(new SaveError((error as Error).message));
    }
  }

  async find(data: GetEntryData): Promise<GenericResponse> {
    const entries = await knex('entries').select<EntryData[]>().where(data);
    if (entries.length === 0) {
      return left(new Error());
    }
    entries.forEach(entry => {
      if (entry.value < 0) {
        entry.type = 'output';
      } else {
        entry.type = 'entry';
      }
    });
    return right(entries);
  }
}
