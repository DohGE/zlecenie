import { createAction, props } from '@ngrx/store';
import { User } from '../../../../shared/models/user.model';
import { SignUp } from '../../../../shared/models/signUp.model';
import { Auth } from '../../../../shared/models/auth.model';

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ signUp: SignUp }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ user: User; auth: Auth }>()
);

export const signUpFail = createAction(
  '[Auth] Sign Up Fail',
  props<{ error: string }>()
);

export const logIn = createAction('[Auth] Log In', props<{ signUp: SignUp }>());

export const logInSuccess = createAction(
  '[Auth] Log In Success',
  props<{ auth: Auth }>()
);

export const logInFail = createAction(
  '[Auth] Log In Fail',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
