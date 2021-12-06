import { CryptProvider } from '../crypt-provider';
import bcrypt from 'bcrypt';

const SALT = 10;

export class BCryptProvider implements CryptProvider {
  async hash(password: string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, SALT);
    return passwordHash;
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    const match = await bcrypt.compare(password, passwordHash);
    return match;
  }
}
