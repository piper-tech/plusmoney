import { CreateUserDTO } from "../usecases/create-user/create-user-dto";

export interface UserRepository {
    save(data: CreateUserDTO): Promise<boolean>;
    findByEmail(email: string): Promise<CreateUserDTO | undefined>;
}