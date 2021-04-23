import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Category } from 'src/models/category.model';
import { getFilters } from 'src/app/store/actions/filters.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  width: number;
  categories$: Observable<Category[]>;
  loadingState: Boolean;

  constructor(
    private store: Store<{
      filters: { categoriesList: Category[]; isLoading: Boolean };
    }>
  ) {
    this.categories$ = this.store.select(
      (state) => state.filters.categoriesList
    );
  }

  ngOnInit(): void {
    // get all filters
    this.store.dispatch(getFilters());

    // set width of carousel based on width of window
    this.setCarouselWidth();
  }

  setCarouselWidth() {
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
