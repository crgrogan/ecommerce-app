import { Component, OnInit } from '@angular/core';
import {
  faTimes,
  faUserCircle,
  faSearch,
  faShoppingBasket,
  faBars,
  faUser,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutUser } from 'src/app/store/actions/user.actions';
import { Category } from 'src/models/category.model';

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
  faUser = faUser;
  faWrench = faWrench;
  currentUser$: Observable<{}>;
  categories$: Observable<Category[]>;

  constructor(
    private store: Store<{
      currentUser: { userInfo };
      filters: {
        categoriesList: Category[];
      };
    }>
  ) {
    this.currentUser$ = this.store.select(
      (state) => state.currentUser.userInfo
    );
    this.categories$ = this.store.select(
      (state) => state.filters.categoriesList
    );
  }

  ngOnInit(): void {}

  // toggle hamburger menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSearchbar() {
    this.searchbarOpen = !this.searchbarOpen;
  }

  logoutUser() {
    this.store.dispatch(logoutUser());
  }
}
