import { CreateUserDTO } from "../../../usecases/create-user/create-user-dto";
import { UserRepository } from "../../user-repository";

export class UserMemoryRepository implements UserRepository{
    users: CreateUserDTO[] = [];
    async save(data: CreateUserDTO): Promise<boolean> {
        this.users.push(data);
        return true;
    }
    async findByEmail(email: string): Promise<CreateUserDTO | undefined> {
        return this.users.find(user => user.email === email);
    }
}