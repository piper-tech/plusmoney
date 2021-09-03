import { User } from "../../../entities/user";
import { UserRepository } from "../../user-repository";

export class UserMemoryRepository implements UserRepository{
    users: User[] = [];
    async save(user: User): Promise<boolean> {
        this.users.push(user);
        return true;
    }
    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
}