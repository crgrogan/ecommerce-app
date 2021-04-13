import { Component, OnInit } from '@angular/core';
import { Category } from 'src/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  width: number;

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

  ngOnInit(): void {
    // set width of carousel based on width of window
    if (window.innerWidth >= 768 && window.innerWidth < 992) {
      this.width = 625;
    } else if (window.innerWidth >= 992 && window.innerWidth < 1264) {
      this.width = 835;
    } else if (window.innerWidth >= 1264) {
      this.width = 1035;
    } else {
      this.width = 200;
    }
  }
}
