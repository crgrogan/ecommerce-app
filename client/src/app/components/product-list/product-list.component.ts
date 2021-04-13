import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  /*  const { products, isLoading, error } = useSelector(
    (state) => state.productsList
  ); */

  productDetails: Product[] = [
    {
      description:
        'Tommy Hilfiger oxford shirt with stretch in slim fit in white',
      brand: 'Tommy Hilfiger',
      rating: 5,
      reviews: 10,
      price: 21.95,
      image:
        'https://images.asos-media.com/products/river-island-slim-oxford-shirt-with-grandad-collar-in-white/22724287-1-white?$n_320w$&wid=317&fit=constrain',
    },
    {
      description:
        'Tommy Hilfiger oxford shirt with stretch in slim fit in white',
      brand: 'Tommy Hilfiger',
      rating: 5,
      reviews: 10,
      price: 11.95,
      image:
        'https://images.asos-media.com/products/river-island-slim-oxford-shirt-with-grandad-collar-in-white/22724287-1-white?$n_320w$&wid=317&fit=constrain',
    },
    {
      description:
        'Tommy Hilfiger oxford shirt with stretch in slim fit in white',
      brand: 'Tommy Hilfiger',
      rating: 5,
      reviews: 10,
      price: 25.95,
      image:
        'https://images.asos-media.com/products/river-island-slim-oxford-shirt-with-grandad-collar-in-white/22724287-1-white?$n_320w$&wid=317&fit=constrain',
    },
    {
      description:
        'Tommy Hilfiger oxford shirt with stretch in slim fit in white',
      brand: 'Tommy Hilfiger',
      rating: 3,
      reviews: 8,
      price: 25.95,
      image:
        'https://images.asos-media.com/products/river-island-slim-oxford-shirt-with-grandad-collar-in-white/22724287-1-white?$n_320w$&wid=317&fit=constrain',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    /* dispatch(getProducts()); */
  }
}
