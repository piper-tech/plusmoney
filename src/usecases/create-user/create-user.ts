import { UserRepository } from "../../repositories/user-repository";
import { CreateUserDTO } from "./create-user-dto";
import { User } from "../../entities/user";
export class CreateUserUseCase {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(data: CreateUserDTO): Promise<void>{
        try {
            const user = new User(data.name, data.email, data.password);
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
        }
    }
}