import feathersClient from '@client'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const selectRoomAction = createAsyncThunk(
  'chat/selectRoom',
  async ({ roomId }) => {
    const room = await feathersClient.service('rooms').find({
      query: {
        _id: roomId,
      },
    })

    if (room.data.length > 0) {
      return { room: room.data[0] }
    }
  }
)

export const selectRoomReducers = {
  [selectRoomAction.pending]: (state) => {
    state.loading = true
    state.error = false
    state.room = null
  },
  [selectRoomAction.rejected]: (state, action) => {
    state.loading = false
    state.error = action.error.message
    state.room = null
  },
  [selectRoomAction.fulfilled]: (state, action) => {
    state.loading = false
    state.error = false
    state.room = action.payload.room
  },
}
