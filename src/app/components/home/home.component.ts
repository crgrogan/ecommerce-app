import { Component, OnInit } from '@angular/core';
import { Category } from 'src/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [
    {
      name: 'T-Shirts & Shirts',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-t-shirt-with-bloom-of-youth-multicoloured-text-print-in-acid-wash/20831307-3?$XXL$&wid=513&fit=constrain&hei=236&wid=185&bgc=000000',
    },
    {
      name: 'Jeans & Trousers',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-t-shirt-with-bloom-of-youth-multicoloured-text-print-in-acid-wash/20831307-3?$XXL$&wid=513&fit=constrain&hei=236&wid=185&bgc=000000',
    },
    {
      name: 'Joggers & Tracksuits',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-t-shirt-with-bloom-of-youth-multicoloured-text-print-in-acid-wash/20831307-3?$XXL$&wid=513&fit=constrain&hei=236&wid=185&bgc=000000',
    },
    {
      name: 'Hoodies & Sweatshirts',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-t-shirt-with-bloom-of-youth-multicoloured-text-print-in-acid-wash/20831307-3?$XXL$&wid=513&fit=constrain&hei=236&wid=185&bgc=000000',
    },
    {
      name: 'Jackets & Coats',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-t-shirt-with-bloom-of-youth-multicoloured-text-print-in-acid-wash/20831307-3?$XXL$&wid=513&fit=constrain&hei=236&wid=185&bgc=000000',
    },
    {
      name: 'Shoes',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-t-shirt-with-bloom-of-youth-multicoloured-text-print-in-acid-wash/20831307-3?$XXL$&wid=513&fit=constrain&hei=236&wid=185&bgc=000000',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
