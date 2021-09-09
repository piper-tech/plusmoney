import { AuthenticationProvider, AuthResponse } from '@/providers';
import jwt from 'jsonwebtoken';
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export class AuthenticationJwt implements AuthenticationProvider {
  async auth(email: string): Promise<AuthResponse> {
    const token = jwt.sign({ email: email }, SECRET_TOKEN, { expiresIn: 120 });
    const authResponse: AuthResponse = {
      accessToken: token
    };
    return authResponse;
  }

  async verify(accessToken: string): Promise<boolean> {
    try {
      jwt.verify(accessToken, SECRET_TOKEN);
      return true;
    } catch (error) {
      return false;
    }
  }
}
