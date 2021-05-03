import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  registerPageUnloaded,
  registerUser,
} from 'src/app/store/actions/user.actions';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private store: Store<{
      newUser: { userInfo: User; isLoading: boolean; err: string };
    }>
  ) {
    this.error$ = this.store.select((state) => state.newUser.err);
    this.loading$ = this.store.select((state) => state.newUser.isLoading);
  }

  ngOnInit(): void {}

  submitForm(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(
        registerUser(form.value.name, form.value.email, form.value.password)
      );
    }
    // reset form values
    form.resetForm();
  }

  ngOnDestroy(): void {
    // set error state in store back to null
    this.store.dispatch(registerPageUnloaded());
  }
}
