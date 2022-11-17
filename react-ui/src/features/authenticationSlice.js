import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const doLogin = async (password, username) => {
  const options = {
    body: JSON.stringify({password, username}),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  };

  const response = await fetch('http://localhost:8080/auth/login', options);
  const data = await response.json();
  return await data;
};

const verifyToken = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };

  const response = await fetch('http://localhost:8080/auth/verify', options);
  const data = await response.json();
  return data;
};

export const verifyAuthentication = createAsyncThunk('auth/verify', async ({password, token, username}) => {
  if (!token && password && username) {
    const response = await doLogin(password, username);
    const { isSuccess, token } = response;
    if (isSuccess && token) {
      localStorage.setItem('jwt', token);
    }
    return isSuccess;
  } else if (token) {
    const response = await verifyToken(token);
    const { isSuccess } = response;
    if (!isSuccess) {
      localStorage.removeItem('jwt');
    }
    return isSuccess;
  } else {
    localStorage.removeItem('jwt');
    return false;
  }
});

export const authenticationSlice = createSlice({
  name: 'isAuth',
  initialState: false,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(verifyAuthentication.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectIsAuth = state => state.isAuth;

export default authenticationSlice.reducer;