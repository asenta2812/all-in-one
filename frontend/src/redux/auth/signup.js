import { createAsyncThunk } from '@reduxjs/toolkit'
import feathersClient from '@client'
export const signUpUserAction = createAsyncThunk(
  'auth/signUpUser',
  async (data) => {
    const result = await feathersClient.service('users').create(data)
    return result
  }
)

export const signUpReducers = {
  [signUpUserAction.pending]: (state) => {
    state.loading = true
    state.error = false
    state.userID = null
  },
  [signUpUserAction.rejected]: (state, action) => {
    state.loading = false
    state.error = action.error.message
    state.userID = null
  },
  [signUpUserAction.fulfilled]: (state, action) => {
    state.loading = false
    state.error = false
    state.user = action.payload
  },
}
