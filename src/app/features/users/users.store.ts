import { inject } from "@angular/core";
import { UserService } from "@features/users/users.service";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { ToastrService } from 'ngx-toastr';
import { pipe, switchMap, tap } from "rxjs";
import { User, UserResponse } from "./models/user.model";

type UserState = {
  currentUser: UserResponse | undefined;
  isLoading: boolean;
}

const initialState: UserState = {
  currentUser: undefined,
  isLoading: false,
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userSvc = inject(UserService), toastrSvc = inject(ToastrService)) => ({
/*     setUser(user:UserResponse) {
      patchState(store, setEntity(user));
    }, */
    createUser: rxMethod<User>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((user:User) => {
          return userSvc.create(user)
            .pipe(
              tapResponse({
                next: (newUser: UserResponse) => { 
                  patchState(store, { currentUser: newUser })
                },
                error: console.error,
                finalize: ()=> patchState(store, { isLoading: false })
              }),
              tap(() => toastrSvc.info('User added!!', 'DOMINI STORE'))
          )
        }),
      )
    ),
    loginUser: rxMethod<User>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
          switchMap((user:User) => {
          return userSvc.login(user)
            .pipe(
              tapResponse({
                next: (newUser: UserResponse) => {
                  console.log('newUser UserResponse', newUser);
                  patchState(store, { currentUser: newUser })
                },
                error: console.error,
                finalize: ()=> patchState(store, { isLoading: false })
              }),
              tap(() => toastrSvc.info('Login !!', 'DOMINI STORE'))
          )
        }),
      )
    )
  }))
)