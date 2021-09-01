import { User } from "../../../entities/user";
import { UserRepository } from "../../user-repository";

export class UserMemoryRepository implements UserRepository{
    users: User[] = [];
    save(user: User): void {
        this.users.push(user);
    }
}