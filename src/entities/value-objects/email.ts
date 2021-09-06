import { right, left, Either } from "../../shared/either";
import { InvalidEmailError } from "../errors/invalid-email-error";

export class Email {
    readonly email: string;

    private constructor(email: string){
        this.email = email;
    }

    static create(email: string): Either<InvalidEmailError, Email> {
        if(!Email.validate(email)){
            return left(new InvalidEmailError());
        }
        return right(new Email(email));
    }

    static validate(email: string): boolean {
        if(!email){
            return false
        }
        return true;
    }

    get value(): string {
        return this.email;
    }
}