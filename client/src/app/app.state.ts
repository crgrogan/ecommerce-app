import { Category } from 'src/models/category.model';

export interface AppState {
  categories: ReadonlyArray<Category>;
}
