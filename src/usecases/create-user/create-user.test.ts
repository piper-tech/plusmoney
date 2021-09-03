import { UserRepository } from "../../repositories/user-repository"
import { UserMemoryRepository } from "../../repositories/implementations/memory/user-memory-repository"
import { CreateUserUseCase } from "./create-user"
import { CreateUserDTO } from "./create-user-dto"


describe('create-user', () => {
    describe('in memory', () => {
        it('should create a user', async () => {
            const userMemoryRepository = new UserMemoryRepository();
            const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
            const createUserDTO: CreateUserDTO = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
            const success = await createUserUseCase.execute(createUserDTO);
            expect(success).toBe(true);
        })

        it('should not allow creating a user with the same email', async () => {
            try {
                const userMemoryRepository = new UserMemoryRepository();
                const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
                const createUserDTO: CreateUserDTO = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
                await createUserUseCase.execute(createUserDTO);
                await createUserUseCase.execute(createUserDTO);
                expect(false).toBe(true);
            } catch (error: any) {
                expect(error.message).toBe('this email already exists');
            }
        });
    });
});