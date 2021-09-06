import { Name } from "./value-objects/name";
import { Email } from "./value-objects/email";
import { Password } from "./value-objects/password";
import { left, right, Either } from "@/shared/either";
import { InvalidNameError } from "./errors/invalid-name-error";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { InvalidPasswordError } from "./errors/invalid-password-error";
import { UserData } from "./data-transfer-objects/user-data";

export class User {
    readonly name: Name;
    readonly email: Email;
    readonly password: Password;

    private constructor(name: Name, email: Email, password: Password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static create(data: UserData): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> {
        const nameOrError = Name.create(data.name);
        const emailOrError = Email.create(data.email);
        const passwordOrError = Password.create(data.password);
        if(nameOrError.isLeft()){
            return left(nameOrError.value);
        }
        if(emailOrError.isLeft()){
            return left(emailOrError.value);
        }
        if(passwordOrError.isLeft()){
            return left(passwordOrError.value);
        }
        const name: Name = nameOrError.value;
        const email: Email = emailOrError.value;
        const password: Password = passwordOrError.value;
        return right(new User(name, email, password));
    }

}