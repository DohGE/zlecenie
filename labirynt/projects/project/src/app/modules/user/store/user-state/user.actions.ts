import { createAction, props } from '@ngrx/store';
import { User } from '../../../../shared/models/user.model';

export const loadUser = createAction('[Users] Load User');

export const loadUserSuccess = createAction(
  '[Users] Load User Success',
  props<{ user: User }>()
);

export const loadUserFail = createAction(
  '[Users] Load User Fail',
  props<{ error: string }>()
);

export const saveUser = createAction(
  '[Users] Save User',
  props<{ user: User }>()
);

export const saveUserSuccess = createAction('[Users] Save User Success');

export const saveUserFail = createAction(
  '[Users] Save User Fail',
  props<{ error: string }>()
);
