import { UserData } from "@/entities/data-transfer-objects/user-data";
import { UserRepository } from "@/repositories/user-repository";

export class UserMemoryRepository implements UserRepository{
    users: UserData[] = [];
    async save(data: UserData): Promise<boolean> {
        this.users.push(data);
        return true;
    }
    async findByEmail(email: string): Promise<UserData | undefined> {
        return this.users.find(user => user.email === email);
    }
}