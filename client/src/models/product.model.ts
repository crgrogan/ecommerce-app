export interface Product {
  name: string;
  description: string;
  category: string;
  brand: string;
  img: string;
  price: number;
  colour: string;
  rating?: number;
  numReviews?: number;
  countInStock: number;
  _id: string;
  qty?: number;
}
