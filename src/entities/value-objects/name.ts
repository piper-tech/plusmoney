import { right, left, Either } from "../../shared/either";
import { InvalidNameError } from "../errors/invalid-name-error";

export class Name {
    readonly name: string;

    private constructor(name: string){
        this.name = name;
    }

    static create(name: string): Either<InvalidNameError, Name> {
        if(!Name.validate(name)){
            return left(new InvalidNameError());
        }
        return right(new Name(name));
    }

    static validate(name: string): boolean {
        if(!name){
            return false
        }
        return true;
    }

    get value(): string {
        return this.name;
    }

}