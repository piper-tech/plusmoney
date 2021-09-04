import { User } from "../../../entities/user";
import { UserRepository } from "../../user-repository";
import knex from './knex';

export class UserMysqlRepository implements UserRepository {
    async save(user: User): Promise<boolean> {
        try {
            await knex('users').insert(user);
            return true;
        } catch (error) {
            console.log(error);
            return false          
        }
    }
    async findByEmail(email: string): Promise<User | undefined> {
        const user = await knex('users').select().where({email: email});
        return user[0];
    }
}