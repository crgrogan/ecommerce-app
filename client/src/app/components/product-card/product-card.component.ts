import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() data: Product;
  constructor() {}

  ngOnInit(): void {}
}