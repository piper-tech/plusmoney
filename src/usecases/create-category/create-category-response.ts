import { Either } from '@/shared';
import { InvalidCategoryError } from '@/entities/errors';
import { CategoryData } from '@/entities/data-transfer-objects';

export type CreateCategoryResponse = Either<InvalidCategoryError, CategoryData>
