import { User } from "../../../entities/user";
import { CreateUserDTO } from "../../../usecases/create-user/create-user-dto";
import { UserRepository } from "../../user-repository";
import knex from './knex';

export class UserMysqlRepository implements UserRepository {
    async save(data: CreateUserDTO): Promise<boolean> {
        try {
            await knex('users').insert(data);
            return true;
        } catch (error) {
            console.log(error);
            return false          
        }
    }
    async findByEmail(email: string): Promise<CreateUserDTO | undefined> {
        const user = await knex('users').select().where({email: email});
        return user[0];
    }
}