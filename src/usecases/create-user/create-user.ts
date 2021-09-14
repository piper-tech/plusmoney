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
    const exists = await this.userRepository.findByEmail(user.email.value);
    if (exists) {
      return left(new EmailAlreadyExistsError(user.email.value));
    }
    await this.userRepository.save(data);
    delete data.password;
    return right(data);
  }
}
