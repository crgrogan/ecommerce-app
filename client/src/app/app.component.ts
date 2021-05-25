import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getFilters } from './store/actions/filters.actions';
import { selectFiltersLoading } from './store/selectors/filters.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  filtersLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.filtersLoading$ = this.store.select(selectFiltersLoading);
  }

  ngOnInit(): void {
    // get all filters
    this.store.dispatch(getFilters(false));
  }
}
