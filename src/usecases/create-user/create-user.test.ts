import { UserRepository } from "../../repositories/user-repository"
import { UserMemoryRepository } from "../../repositories/implementations/memory/user-memory-repository"
import { CreateUserUseCase } from "./create-user"
import { CreateUserDTO } from "./create-user-dto"


describe('create-user', () => {
    it('should create in a memory user', async () => {
        const userMemoryRepository = new UserMemoryRepository();
        const createUserUseCase = new CreateUserUseCase(userMemoryRepository);
        const createUserDTO: CreateUserDTO = { name: 'Teste', email: 'teste@gmail.com', password: '123' }
        await createUserUseCase.execute(createUserDTO);
        expect(userMemoryRepository.users.length).toBe(1);
    })
})