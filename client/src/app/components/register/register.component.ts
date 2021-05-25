import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import {
  registerPageUnloaded,
  registerUser,
} from 'src/app/store/actions/user.actions';
import {
  selectNewUserError,
  selectNewUserLoading,
} from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.error$ = this.store.select(selectNewUserError);
    this.loading$ = this.store.select(selectNewUserLoading);
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(
        registerUser(form.value.name, form.value.email, form.value.password)
      );
    }
    // reset form values and state
    form.resetForm();
  }

  ngOnDestroy(): void {
    // set error state in store back to null
    this.store.dispatch(registerPageUnloaded());
  }
}
