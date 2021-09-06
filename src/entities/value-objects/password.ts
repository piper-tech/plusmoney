import { right, left, Either } from "@/shared/either";
import { InvalidPasswordError } from "@/entities/errors";

export class Password {
    readonly password: string;

    private constructor(password: string){
        this.password = password;
    }

    static create(password: string): Either<InvalidPasswordError, Password> {
        if(!Password.validate(password)){
            return left(new InvalidPasswordError());
        }
        return right(new Password(password));
    }

    static validate(password: string): boolean {
        if(!password){
            return false
        }
        return true;
    }

    get value(): string {
        return this.password;
    }
}