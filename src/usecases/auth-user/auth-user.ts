import { AuthenticateUserResponse } from '@/usecases/auth-user';
import { AuthenticationProvider, CryptProvider } from '@/providers';
import { UserRepository } from '@/repositories';
import { InvalidCredentials } from '../errors';
import { right, left } from '@/shared';
import { AuthUserData } from './auth-user-data';

export class AuthenticateUserUseCase {
  private authenticationProvider: AuthenticationProvider;
  private userRepository: UserRepository;
  private cryptProvider: CryptProvider;

  constructor(
    authenticationProvider: AuthenticationProvider,
    userRepository: UserRepository,
    cryptProvider: CryptProvider
  ) {
    this.authenticationProvider = authenticationProvider;
    this.userRepository = userRepository;
    this.cryptProvider = cryptProvider;
  }

  async execute(data: AuthUserData): Promise<AuthenticateUserResponse> {
    const userOrError = await this.userRepository.findByEmail(data.email);
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }
    const user = userOrError.value;
    const match = await this.cryptProvider.compare(data.password, user.password as string);
    if (!match) {
      return left(new InvalidCredentials());
    }
    const authResponse = await this.authenticationProvider.auth(user.id as number);
    return right(authResponse);
  }
}
