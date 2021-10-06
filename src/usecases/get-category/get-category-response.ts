import { CategoryData } from '@/entities/data-transfer-objects';
import { Either } from '@/shared';

export type GetCategoryResponse = Either<Error, CategoryData[]>
