import { Either, left, right } from '@/shared';
import { InvalidCategoryError } from './errors/invalid-category-error';

export class Category {
  private description: string;

  private constructor(description: string) {
    this.description = description;
  }

  static create(description: string): Either<InvalidCategoryError, Category> {
    if (!description) {
      left(new InvalidCategoryError());
    }
    return right(new Category(description));
  }
}
