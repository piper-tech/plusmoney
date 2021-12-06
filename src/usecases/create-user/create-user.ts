import { CategoryRepository, UserRepository } from '@/repositories';
import { UserData } from '@/entities/data-transfer-objects';
import { User } from '@/entities';
import { left, right } from '@/shared';
import { EmailAlreadyExistsError } from '@/usecases/errors';
import { CreateUserResponse } from './create-user-response';
import { CryptProvider } from '@/providers';

export class CreateUserUseCase {
  private userRepository: UserRepository;
  private categoryRepository: CategoryRepository;
  private cryptProvider: CryptProvider;

  constructor(
    userRepository: UserRepository,
    categoryRepository: CategoryRepository,
    cryptProvider: CryptProvider
  ) {
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
    this.cryptProvider = cryptProvider;
  }

  async execute(data: UserData): Promise<CreateUserResponse> {
    const userOrError = User.create(data);
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }
    const user = userOrError.value;
    const userExists = await this.userRepository.findByEmail(user.email.value);
    if (userExists.isRight()) {
      return left(new EmailAlreadyExistsError(user.email.value));
    }

    const passwordHash = await this.cryptProvider.hash(data.password as string);
    data.password = passwordHash;

    const createdOrError = await this.userRepository.save(data);
    if (createdOrError.isLeft()) {
      return left(createdOrError.value);
    }
    const createdDefaultCategoryOrError = await this.categoryRepository.save({ userId: createdOrError.value.id, description: 'Não categorizado' });
    if (createdDefaultCategoryOrError.isLeft()) {
      return left(new Error('there was an error registering the default category'));
    }
    return right(createdOrError.value);
  }
}
