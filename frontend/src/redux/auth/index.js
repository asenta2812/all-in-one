import { createSlice } from '@reduxjs/toolkit'
import { signInReducers, signInUserAction } from './signin'
import { signOutReducers, signOutUserAction } from './signout'
import { signUpReducers, signUpUserAction } from './signup'
import {
  selectAuthError,
  selectLoading,
  selectCurrentUser,
  selectIsAuthenticated,
  selectToken,
} from './selector'
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    ...signUpReducers,
    ...signInReducers,
    ...signOutReducers,
  },
})

export {
  signUpUserAction,
  signInUserAction,
  signOutUserAction,
  selectAuthError,
  selectLoading,
  selectCurrentUser,
  selectToken,
  selectIsAuthenticated,
}

export default authSlice.reducer
