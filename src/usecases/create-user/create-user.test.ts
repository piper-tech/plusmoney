import { UserMemoryRepository } from "@/repositories/implementations/memory/user-memory-repository"
import { UserMysqlRepository } from "@/repositories/implementations/mysql/user-mysql-repository";
import { CreateUserUseCase } from "./create-user"
import { UserData } from "@/entities/data-transfer-objects/user-data"
import knex from '@/repositories/implementations/mysql/knex';


describe('create-user', () => {
    describe('in memory', () => {
        it('should create a user', async () => {
            const userMemoryRepository = new UserMemoryRepository();
            const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
            const userData: UserData = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            const response = await createUserUseCase.execute(userData);
            expect(response.isRight()).toBeTruthy();
        })

        it('should not allow creating a user with the same email', async () => {
            const userMemoryRepository = new UserMemoryRepository();
            const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
            const userData: UserData = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            await createUserUseCase.execute(userData);
            const error = await createUserUseCase.execute(userData);
            expect(error.isLeft()).toBeTruthy();
        });
    });

    describe('mysql', () => {
        afterAll(async () => {
            await knex.destroy();
        });

        afterEach(async () => {
            await knex('users').truncate();
        });

        it('should create a user', async () => {
            const userMysqlRepository = new UserMysqlRepository();
            const createUserUseCase = new CreateUserUseCase(userMysqlRepository);
            const userData: UserData = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            const response = await createUserUseCase.execute(userData);
            expect(response.isRight()).toBeTruthy();
        })

        it('should not allow creating a user with the same email', async () => {
            const userMysqlRepository = new UserMysqlRepository();
            const createUserUseCase = new CreateUserUseCase(userMysqlRepository);
            const userData: UserData = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            await createUserUseCase.execute(userData);
            const error = await createUserUseCase.execute(userData);
            expect(error.isLeft()).toBeTruthy();
        });
    })
});