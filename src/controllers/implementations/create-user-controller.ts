import { Controller } from "../controller";
import { HttpResponse } from "../http-response";
import { CreateUserDTO } from "../../usecases/create-user/create-user-dto";
import { CreateUserUseCase } from "../../usecases/create-user/create-user";
import { UserMysqlRepository } from "../../repositories/implementations/mysql/user-mysql-repository";

export class CreateUserController implements Controller {
    private createUser = new CreateUserUseCase(new UserMysqlRepository());

    async handler(request: CreateUserDTO): Promise<HttpResponse> {
        const createUserOrError = await this.createUser.execute(request);
        if(createUserOrError.isLeft()){
            return {
                statusCode: 400,
                body: createUserOrError.value
            }
        }
        return {
            statusCode: 200,
            body: {
                message: 'ok'
            }
        }
    }

}