import { User } from "../entities/user";

export interface UserRepository {
    save(user: User): Promise<boolean>;
    findByEmail(email: string): Promise<User | undefined>;
}