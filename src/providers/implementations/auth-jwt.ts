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

  async verify(accessToken: string): Promise<any | boolean> {
    try {
      const decoded = await jwt.verify(accessToken, SECRET_TOKEN);
      return decoded;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
