import { UserRepository } from "../../repositories/user-repository";
import { CreateUserDTO } from "./create-user-dto";
import { User } from "../../entities/user";
export class CreateUserUseCase {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(data: CreateUserDTO): Promise<void> {
        const user = new User(data.name, data.email, data.password);
        const exists = await this.userRepository.findByEmail(user.email);
        if(exists){
            throw new Error('this email already exists');
        }
        await this.userRepository.save(user);
    }
}