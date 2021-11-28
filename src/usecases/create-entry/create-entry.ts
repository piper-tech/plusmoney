import { Entry } from '@/entities';
import { EntryData } from '@/entities/data-transfer-objects';
import { CategoryRepository, EntryRepository } from '@/repositories';
import { left, right } from '@/shared';
import { CreateEntryResponse } from './create-entry-response';

export class CreateEntryUseCase {
  private entryRepository: EntryRepository;
  private categoryRepository: CategoryRepository;

  constructor(entryRepository: EntryRepository, categoryRepository: CategoryRepository) {
    this.entryRepository = entryRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute(data: EntryData): Promise<CreateEntryResponse> {
    const entryOrError = Entry.create(data.description, data.value, data.date);
    if (entryOrError.isLeft()) {
      return left(entryOrError.value);
    }
    if (!data.userId) {
      return left(new Error('user id not provided'));
    }
    if (!data.categoryId) {
      const findedCategoryOrError = await this.categoryRepository.find({ userId: data.userId, description: 'Não categorizado' });
      if (findedCategoryOrError.isLeft()) {
        const createdCategoryOrError = await this.categoryRepository.save({ userId: data.userId, description: 'Não categorizado' });
        if (createdCategoryOrError.isLeft()) {
          return left(new Error('there was an error registering the entry'));
        } else {
          data.categoryId = createdCategoryOrError.value.id;
        }
      } else {
        data.categoryId = findedCategoryOrError.value[0].id;
      }
    }
    data.date = entryOrError.value.date;
    data.value = entryOrError.value.entryValue;
    const createdOrError = await this.entryRepository.save(data);
    if (createdOrError.isLeft()) {
      return left(new Error('there was an error in the database operation'));
    }
    return right(data);
  }
}
