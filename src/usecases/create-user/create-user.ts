import { UserRepository } from "../../repositories/user-repository";
import { UserData } from "../../entities/data-transfer-objects/user-data";
import { User } from "../../entities/user";
import { left, right } from "../../shared/either";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { CreateUserResponse } from "./create-user-response";

export class CreateUserUseCase {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(data: UserData): Promise<CreateUserResponse> {
        const userOrError = User.create(data);
        if(userOrError.isLeft()){
            return left(userOrError.value);
        }
        const user = userOrError.value;
        const exists = await this.userRepository.findByEmail(user.email.value);
        if(exists){
            return left(new EmailAlreadyExistsError(user.email.value));
        }
        await this.userRepository.save(data);
        return right(data);
    }
}