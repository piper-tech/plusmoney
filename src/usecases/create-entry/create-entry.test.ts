import { EntryMemoryRepository, EntryMysqlRepository } from '@/repositories/implementations';
import { CreateEntryUseCase } from './create-entry';
import { EntryData } from '@/entities/data-transfer-objects';
import knex from '@/repositories/implementations/mysql/knex';

describe('create-entry', () => {
  describe('in memory', () => {
    it('should create a entry', async () => {
      const entryData: EntryData = { description: 'Teste', value: 10, date: new Date(), userId: 1 };
      const entryMemoryRepository = new EntryMemoryRepository();
      const createEntryUseCase = new CreateEntryUseCase(entryMemoryRepository);
      const success = await createEntryUseCase.execute(entryData);
      expect(success.isRight()).toBeTruthy();
    });

    it('should not allow creating a entry with invalid data', async () => {
      const entryData: EntryData = { description: '', value: 0, date: new Date(), userId: 1 };
      const entryMemoryRepository = new EntryMemoryRepository();
      const createEntryUseCase = new CreateEntryUseCase(entryMemoryRepository);
      const success = await createEntryUseCase.execute(entryData);
      expect(success.isLeft()).toBeTruthy();
    });
  });

  describe('mysql', () => {
    afterAll(async () => {
      await knex.destroy();
    });

    afterEach(async () => {
      await knex('entries').delete();
    });

    it('should create a entry', async () => {
      const entryData: EntryData = { description: 'Teste', value: 10, date: new Date(), userId: 1 };
      const entryMysqlRepository = new EntryMysqlRepository();
      const createEntryUseCase = new CreateEntryUseCase(entryMysqlRepository);
      const success = await createEntryUseCase.execute(entryData);
      expect(success.isRight()).toBeTruthy();
    });

    it('should not allow creating a entry with invalid data', async () => {
      const entryData: EntryData = { description: '', value: 0, date: new Date(), userId: 1 };
      const entryMysqlRepository = new EntryMysqlRepository();
      const createEntryUseCase = new CreateEntryUseCase(entryMysqlRepository);
      const success = await createEntryUseCase.execute(entryData);
      expect(success.isLeft()).toBeTruthy();
    });
  });
});
