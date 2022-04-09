import { createAsyncThunk } from '@reduxjs/toolkit'
import feathersClient from '@client'

export const signOutUserAction = createAsyncThunk(
  'auth/signOutUser',
  async () => {
    await feathersClient.logout()
  }
)

export const signOutReducers = {
  [signOutUserAction.pending]: (state) => {
    state.loading = true
    state.error = false
    state.userID = null
    state.token = null
  },
  [signOutUserAction.rejected]: (state, action) => {
    state.loading = false
    state.error = action.error.message
    state.userID = null
    state.token = null
  },
  [signOutUserAction.fulfilled]: (state) => {
    state.loading = false
    state.error = false
    state.userID = null
    state.token = null
  },
}
