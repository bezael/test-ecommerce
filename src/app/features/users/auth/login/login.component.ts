import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserStore } from '@features/users/users.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  public loginForm!: FormGroup;

  private readonly _userStore = inject(UserStore);
  private readonly _fb = new FormBuilder();
  private readonly _route = inject(Router);

  constructor() {
    this._buildForm();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this._userStore.loginUser(this.loginForm.value);
      this.loginForm.reset();
      this._route.navigate(['/']);
    }
  }

  private _buildForm(): void {
    this.loginForm = this._fb.nonNullable.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
