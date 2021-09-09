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
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      return left(new InvalidCredentials());
    }
    if (user.password !== data.password) {
      return left(new InvalidCredentials());
    }
    const authResponse = await this.authenticationProvider.auth(data.email);
    return right(authResponse);
  }
}
