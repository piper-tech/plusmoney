import { UserData } from '@/entities/data-transfer-objects';

export interface UserRepository {
  save(data: UserData): Promise<boolean>;
  findByEmail(email: string): Promise<UserData | undefined>;
}
