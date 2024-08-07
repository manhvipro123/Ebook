import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  idToken: '',
  loading: false,
  error: null,
  isStaticUser: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signInWithGoogle, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      loading: true,
    };
  }),
  on(AuthActions.signInWithGoogleSuccess, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      loading: false,
    };
  }),
  on(AuthActions.signInWithGoogleFailure, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      error: action.error,
      loading: false,
    };
  }),
  on(AuthActions.signOut, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      loading: true,
    };
  }),
  on(AuthActions.signOutSuccess, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      idToken: '',
      isStaticUser: false,
      loading: false,
    };
  }),
  on(AuthActions.signOutFailure, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      error: action.error,
      loading: false,
    };
  }),
  on(AuthActions.storeIdToken, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      idToken: action.idToken,
    };
  }),
  on(AuthActions.signInWithStaticUser, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      loading: true,
    };
  }),
  on(AuthActions.signInWithStaticUserSuccess, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      idToken: action.idToken,
      isStaticUser: true,
      loading: false,
    };
  }),
  on(AuthActions.signInWithStaticUserFailure, (state, action) => {
    console.log(action.type);
    return <AuthState>{
      ...state,
      error: action.error,
      loading: false,
    };
  }),
);
