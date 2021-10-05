import { AuthenticationProvider, AuthData } from '@/providers';
import jwt from 'jsonwebtoken';
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export class AuthenticationJwt implements AuthenticationProvider {
  async auth(id: number): Promise<AuthData> {
    const token = jwt.sign({ userId: id }, SECRET_TOKEN, { expiresIn: 3600 });
    const authResponse: AuthData = {
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
