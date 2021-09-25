import { EntryData } from '@/entities/data-transfer-objects';
import { EntryRepository, SaveResponse } from '@/repositories/entry-repository';
import { SaveError } from '@/repositories/errors';
import { left, right } from '@/shared';
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
}
