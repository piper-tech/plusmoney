import { AuthenticationProvider, AuthData, AuthResponse } from '@/providers';
import jwt from 'jsonwebtoken';
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export class AuthenticationJwt implements AuthenticationProvider {
  async auth(authData: AuthData): Promise<AuthResponse> {
    const token = jwt.sign({ email: authData.email }, SECRET_TOKEN, { expiresIn: 120 });
    const authResponse: AuthResponse = {
      accessToken: token
    };
    return authResponse;
  }
}
