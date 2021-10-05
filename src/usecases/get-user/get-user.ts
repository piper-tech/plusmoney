import { UserRepository } from '@/repositories';
import { left, right } from '@/shared';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { GetUserData } from './get-user-data';
import { GetUserResponse } from './get-user-response';

export class GetUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: GetUserData): Promise<GetUserResponse> {
    console.log(data);
    let userOrError = await this.userRepository.findByEmail(data.email as string);
    if (userOrError.isRight()) {
      const user = userOrError.value;
      delete user.password;
      return right(user);
    }
    userOrError = await this.userRepository.findById(data.id as number);
    if (userOrError.isRight()) {
      const user = userOrError.value;
      delete user.password;
      return right(user);
    }
    return left(new UserNotFoundError());
  }
}
