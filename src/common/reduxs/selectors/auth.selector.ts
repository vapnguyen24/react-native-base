import {AuthState} from '~/common/models/auth.model';
import {RootReducerName} from '~/common/reduxs/reducers/type';

export const getToken = (state: {root: {[RootReducerName.auth]: AuthState}}) =>
  state.root.auth.token;
export const getUser = (state: {root: {[RootReducerName.auth]: AuthState}}) =>
  state.root.auth.user;
