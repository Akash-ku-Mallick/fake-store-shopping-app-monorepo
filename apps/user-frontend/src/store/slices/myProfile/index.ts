import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { userProfile } from './type';
import { profileApi } from '../../services/profileApi';
import type { RootState } from '../../type';

interface myProfileState {
  user: userProfile | null;
}

const initialState: myProfileState = {
  user: null
};

const myProfile = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    removeMyProfile: (state) => {
        state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(profileApi.endpoints.getMyProfile.matchFulfilled, (state, {payload})=>{
      state.user = payload
    })
  },
});

export const { removeMyProfile } = myProfile.actions;
export const getMyProfile = (state: RootState) =>  state.myProfile.user
export default myProfile.reducer;
