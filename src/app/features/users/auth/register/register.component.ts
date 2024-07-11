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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  public registerForm!: FormGroup;

  private readonly _userStore = inject(UserStore);
  private readonly _fb = new FormBuilder();
  private readonly _route = inject(Router);

  constructor() {
    this._buildForm();
  }

  public onRegister(): void {
    if (this.registerForm.valid) {
      this._userStore.createUser(this.registerForm.value);
      this.registerForm.reset();
      this._route.navigate(['/']);
    }

    /*  
     this._userSvc.create(this.registerForm.value)
        .pipe(
        tap((user: any) => console.log('Usersssssssssss', user))
      ).subscribe() 
      */
  }
  /*     console.log(this.registerForm.value);
      console.log(JSON.stringify(this.registerForm.getRawValue())); */

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  private _buildForm(): void {
    this.registerForm = this._fb.nonNullable.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
