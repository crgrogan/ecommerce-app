import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';

export interface AppState {
  filters; // add typescript
  products: ReadonlyArray<Product>;
  product: Product;
}
