import { AuthenticateUserResponse } from '@/usecases/auth-user';
import { AuthenticationProvider } from '@/providers';
import { UserRepository } from '@/repositories';
import { InvalidCredentials } from '../errors';
import { right, left } from '@/shared';
import { AuthUserData } from './auth-user-data';

export class AuthenticateUserUseCase {
  private authenticationProvider: AuthenticationProvider;
  private userRepository: UserRepository;

  constructor(authenticationProvider: AuthenticationProvider, userRepository: UserRepository) {
    this.authenticationProvider = authenticationProvider;
    this.userRepository = userRepository;
  }

  async execute(data: AuthUserData): Promise<AuthenticateUserResponse> {
    const userOrError = await this.userRepository.findByEmail(data.email);
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }
    const user = userOrError.value;
    if (user.password !== data.password) {
      return left(new InvalidCredentials());
    }
    const authResponse = await this.authenticationProvider.auth(user.id as number);
    return right(authResponse);
  }
}
