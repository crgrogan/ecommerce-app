import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Category } from 'src/models/category.model';
import { selectCategoriesList } from 'src/app/store/selectors/filters.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  width: number;
  categories$: Observable<Category[]>;
  loadingState: boolean;

  constructor(private store: Store<AppState>) {
    this.categories$ = this.store.select(selectCategoriesList);
  }

  ngOnInit(): void {
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
