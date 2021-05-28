import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { logoutUser } from 'src/app/store/actions/user.actions';
import { selectCategoriesList } from 'src/app/store/selectors/filters.selectors';
import { selectCurrentUserInfo } from 'src/app/store/selectors/user.selectors';
import { Category } from 'src/models/category.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchbarOpen: boolean = false;
  menuOpen: boolean = false;
  faTimes = faTimes;
  faUserCircle = faUserCircle;
  faSearch = faSearch;
  faShoppingBasket = faShoppingBasket;
  faBars = faBars;
  faUser = faUser;
  faWrench = faWrench;
  currentUser: User;
  userSubsciption: Subscription;
  categories$: Observable<Category[]>;
  redirectUrl: string;
  dropdownOpen: boolean = false;
  isTouchDevice: boolean;

  constructor(private store: Store<AppState>, private router: Router) {
    this.userSubsciption = this.store
      .select(selectCurrentUserInfo)
      .subscribe((user) => {
        this.currentUser = user || null;
      });
    this.categories$ = this.store.select(selectCategoriesList);
  }

  ngOnInit() {
    this.isTouchDevice = this.isTouchScreendevice() ? true : false;
  }

  // toggle hamburger menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSearchbar() {
    this.searchbarOpen = !this.searchbarOpen;
  }

  toggleDropdown() {
    console.log('toggle');

    this.dropdownOpen = !this.dropdownOpen;
  }

  // check if device is a touchscreen
  isTouchScreendevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  redirectToLogin() {
    this.router.navigate(['login'], {
      state: { redirect: this.router.url },
    });
  }

  logoutUser() {
    this.isTouchDevice && this.toggleDropdown();
    this.store.dispatch(logoutUser());
  }

  submitQueryForm(form: NgForm) {
    this.router.navigate(['/products/filter'], {
      queryParams: { q: form.value.search },
    });
    if (this.searchbarOpen) {
      this.searchbarOpen = !this.searchbarOpen;
    }

    form.resetForm();
  }

  ngOnDestroy() {
    this.userSubsciption.unsubscribe();
  }
}
