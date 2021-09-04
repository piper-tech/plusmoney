import { UserRepository } from "../../repositories/user-repository";
import { CreateUserDTO } from "./create-user-dto";
import { User } from "../../entities/user";
import { left, right } from "../../shared/either";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { CreateUserResponse } from "./create-user-response";

export class CreateUserUseCase {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(data: CreateUserDTO): Promise<CreateUserResponse> {
        const user = new User(data.name, data.email, data.password);
        const exists = await this.userRepository.findByEmail(user.email);
        if(exists){
            return left(new EmailAlreadyExistsError(user.email));
        }
        await this.userRepository.save(user);
        return right(data);
    }
}