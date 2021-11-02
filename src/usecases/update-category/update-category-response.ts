import { Either } from '@/shared';
import { CategoryData } from '@/entities/data-transfer-objects';

export type UpdateCategoryResponse = Either<Error, CategoryData>
