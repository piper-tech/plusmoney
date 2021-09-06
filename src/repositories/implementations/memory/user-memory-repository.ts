import { UserData } from "@/entities/data-transfer-objects";
import { UserRepository } from "@/repositories";

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