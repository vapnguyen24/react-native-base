import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState, UserInfo} from '~/common/models/auth.model';
import {RootReducerName} from '~/common/reduxs/reducers/type';

const defaultAuthState: AuthState = {
  token: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: RootReducerName.auth,
  initialState: defaultAuthState,
  reducers: {
    authToken(state: AuthState, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    getUserInfo(state: AuthState, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
  },
});

export const {authToken, getUserInfo} = authSlice.actions;
export const AuthReducer = authSlice.reducer;
