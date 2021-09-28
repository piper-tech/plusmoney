import { EntryMemoryRepository, UserMemoryRepository } from '@/repositories/implementations';
import { GetEntryData, GetEntryUseCase } from '.';
import { CreateEntryUseCase } from '../create-entry';
import { CreateUserUseCase } from '../create-user';

describe('get-entry', () => {
  describe('in memory', () => {
    it('should returns a entry with userId', async () => {
      const userMemoryRepository = new UserMemoryRepository();
      const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
      const userOrError = await createUserUseCase.execute({ email: 'teste@teste.com', name: 'teset', password: '123' });
      if (userOrError.isLeft()) {
        expect(userOrError.value).toBe(false);
        return;
      }
      const user = userOrError.value;
      const entryMemoryRepository = new EntryMemoryRepository();
      const createEntryUseCase = new CreateEntryUseCase(entryMemoryRepository);
      const entryOrError = await createEntryUseCase.execute({
        date: new Date(),
        description: 'teste',
        value: 100,
        userId: user.id as number
      });
      if (entryOrError.isLeft()) {
        expect(entryOrError.value).toBe(false);
        return;
      }
      const getEntryData: GetEntryData = {
        userId: user.id
      };
      const getEntryUseCase = new GetEntryUseCase(entryMemoryRepository);
      const entriesOrError = await getEntryUseCase.execute(getEntryData);
      if (entriesOrError.isLeft()) {
        expect(entriesOrError.value).toBe(false);
        return;
      }
      expect(entriesOrError.isRight).toBeTruthy();
    });
  });
});
