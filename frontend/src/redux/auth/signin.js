import { createAsyncThunk } from '@reduxjs/toolkit'
import feathersClient from '@client'

export const signInUserAction = createAsyncThunk(
  'auth/signInUser',
  async (data) => {
    if (!data) {
      await feathersClient.reAuthenticate()

      const { user, accessToken } = await feathersClient.get('authentication')
      return { user, accessToken }
    } else {
      await feathersClient.authenticate({
        strategy: 'local',
        ...data,
      })

      const { user, accessToken } = await feathersClient.get('authentication')
      return { user, accessToken }
    }
  }
)

export const signInReducers = {
  [signInUserAction.pending]: (state) => {
    state.loading = true
    state.error = false
    state.userID = null
    state.token = null
  },
  [signInUserAction.rejected]: (state, action) => {
    state.loading = false
    state.error = action.error.message
    state.userID = null
    state.token = null
  },
  [signInUserAction.fulfilled]: (state, action) => {
    state.loading = false
    state.error = false
    state.user = action.payload.user
    state.token = action.payload.accessToken
  },
}
