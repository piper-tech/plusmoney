import { UserRepository } from '@/repositories';
import { UserData } from '@/entities/data-transfer-objects';
import { User } from '@/entities';
import { left, right } from '@/shared';
import { EmailAlreadyExistsError } from '@/usecases/errors';
import { CreateUserResponse } from './create-user-response';

export class CreateUserUseCase {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
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
    const createdOrError = await this.userRepository.save(data);
    if (createdOrError.isLeft()) {
      return left(createdOrError.value);
    }
    return right(createdOrError.value);
  }
}
