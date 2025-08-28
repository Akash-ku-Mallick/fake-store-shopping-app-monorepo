import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@shared/api/authApi';
import type { UserType } from '@shared/api/authApi/type';
import type { RootState } from '../../type';


interface AuthState {
  token: string | null;
  user: UserType | null;
  // refresh_token: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null
  // refresh_token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload})=>{
      state.token = payload.token
            state.user = payload.user
      // state.refresh_token = payload.refresh_token
    })
    builder.addMatcher(authApi.endpoints.registerEmail.matchFulfilled, (state, {payload})=>{
      state.user = payload.user
      // state.refresh_token = payload.refresh_token
    })
    builder.addMatcher(authApi.endpoints.verifyEmail.matchFulfilled, (state, {payload})=>{
      state.token = payload.authToken
    })
  },
});

export const { logout } = authSlice.actions;
export const currentToken = (state: RootState) =>  state.auth.token
export const currentUser = (state: RootState) =>  state.auth.user
export default authSlice.reducer;
