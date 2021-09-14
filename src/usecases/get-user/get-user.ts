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
    if (!data.email) {
      return left(new Error('missing params'));
    }
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      return left(new UserNotFoundError());
    }
    delete user.password;
    return right(user);
  }
}
