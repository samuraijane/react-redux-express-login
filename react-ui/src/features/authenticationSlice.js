import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'isAuth',
  initialState: false,
  reducers: {
    doLogin: state => true
  }
});

export const { doLogin } = authenticationSlice.actions;

export const selectIsAuth = state => state.isAuth;

export default authenticationSlice.reducer;