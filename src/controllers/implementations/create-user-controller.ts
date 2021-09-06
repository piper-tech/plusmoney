import { Controller } from "../controller";
import { HttpResponse } from "../http-response";
import { UserData } from "@/entities/data-transfer-objects/user-data";
import { CreateUserUseCase } from "@/usecases/create-user/create-user";
import { UserMysqlRepository } from "@/repositories/implementations/mysql/user-mysql-repository";
import { HttpHelper } from "../helpers/http-helper";

export class CreateUserController implements Controller {
    private createUser = new CreateUserUseCase(new UserMysqlRepository());

    async handler(request: UserData): Promise<HttpResponse> {
        const createUserOrError = await this.createUser.execute(request);
        if(createUserOrError.isLeft()){
            return HttpHelper.badRequest(createUserOrError.value);
        }
        return HttpHelper.created({ message: 'ok' });
    }

}