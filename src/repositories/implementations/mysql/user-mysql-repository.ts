import { UserData } from "../../../entities/data-transfer-objects/user-data";
import { UserRepository } from "../../user-repository";
import knex from './knex';

export class UserMysqlRepository implements UserRepository {
    async save(data: UserData): Promise<boolean> {
        try {
            await knex('users').insert(data);
            return true;
        } catch (error) {
            console.log(error);
            return false          
        }
    }
    async findByEmail(email: string): Promise<UserData | undefined> {
        const user = await knex('users').select().where({email: email});
        return user[0];
    }
}