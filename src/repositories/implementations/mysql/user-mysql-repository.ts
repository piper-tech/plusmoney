import { User } from "../../../entities/user";
import { UserRepository } from "../../user-repository";
import knex from './knex';

export class UserMysqlRepository implements UserRepository {
    private users = knex('users');

    async save(user: User): Promise<boolean> {
        try {
            await this.users.insert(user);
            return true;
        } catch (error) {
            return false          
        }
    }
    async findByEmail(email: string): Promise<User | undefined> {
        try {
            return await this.users.select({email: email});
        } catch (error) {
            return undefined;
        }
    }
}