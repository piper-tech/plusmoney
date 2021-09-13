import { EntryData } from '@/entities/data-transfer-objects';
import { EntryRepository } from '@/repositories/entry-repository';
import knex from './knex';

export class EntryMysqlRepository implements EntryRepository {
  async save(data: EntryData): Promise<boolean> {
    try {
      await knex('entries').insert(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
