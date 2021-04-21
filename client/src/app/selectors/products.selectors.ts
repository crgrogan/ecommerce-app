import { AppState } from '../app.state';

export const selectProducts = (state: AppState) => state.products;

export const selectProduct = (state: AppState) => state.product;
