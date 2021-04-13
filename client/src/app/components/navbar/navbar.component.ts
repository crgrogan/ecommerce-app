import { Component, OnInit } from '@angular/core';
import {
  faTimes,
  faUserCircle,
  faSearch,
  faShoppingBasket,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchbarOpen: boolean = false;
  menuOpen: boolean = false;
  faTimes = faTimes;
  faUserCircle = faUserCircle;
  faSearch = faSearch;
  faShoppingBasket = faShoppingBasket;
  faBars = faBars;

  constructor() {}

  ngOnInit(): void {}

  // toggle hamburger menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSearchbar() {
    this.searchbarOpen = !this.searchbarOpen;
  }
}
