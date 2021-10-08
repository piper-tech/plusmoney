import { GetCategoryData } from '@/usecases/get-category';

export interface EntryData {
  description: string;
  value: number;
  date: Date;
  userId?: number;
  categoryId?: number;
  category?: GetCategoryData;
  type?: string;
}
