import { UserMemoryRepository } from "../../repositories/implementations/memory/user-memory-repository"
import { UserMysqlRepository } from "../../repositories/implementations/mysql/user-mysql-repository";
import { CreateUserUseCase } from "./create-user"
import { CreateUserDTO } from "./create-user-dto"
import knex from '../../repositories/implementations/mysql/knex';


describe('create-user', () => {
    describe('in memory', () => {
        it('should create a user', async () => {
            const userMemoryRepository = new UserMemoryRepository();
            const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
            const createUserDTO: CreateUserDTO = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            const response = await createUserUseCase.execute(createUserDTO);
            expect(response.isRight()).toBeTruthy();
        })

        it('should not allow creating a user with the same email', async () => {
            const userMemoryRepository = new UserMemoryRepository();
            const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
            const createUserDTO: CreateUserDTO = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            await createUserUseCase.execute(createUserDTO);
            const error = await createUserUseCase.execute(createUserDTO);
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
            const createUserDTO: CreateUserDTO = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            const response = await createUserUseCase.execute(createUserDTO);
            expect(response.isRight()).toBeTruthy();
        })

        it('should not allow creating a user with the same email', async () => {
            const userMysqlRepository = new UserMysqlRepository();
            const createUserUseCase = new CreateUserUseCase(userMysqlRepository);
            const createUserDTO: CreateUserDTO = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            await createUserUseCase.execute(createUserDTO);
            const error = await createUserUseCase.execute(createUserDTO);
            expect(error.isLeft()).toBeTruthy();
        });
    })
});