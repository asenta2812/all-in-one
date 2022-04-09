import feathersClient from '@client'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const selectUserAction = createAsyncThunk(
  'chat/selectUser',
  async ({ selectUser, currentUser }) => {
    const room = await feathersClient.service('rooms').find({
      query: {
        'participants.user': {
          $all: [selectUser._id, currentUser._id],
        },
        participants: {
          $size: 2,
        },
      },
    })

    if (room.data.length > 0) {
      return { room: room.data[0] }
    }

    const roomCreate = await feathersClient.service('rooms').create({
      participants: [
        {
          user: selectUser._id,
          nickname: selectUser.name,
          avatar: selectUser.avatar,
        },
        {
          user: currentUser._id,
          avatar: currentUser.avatar,
          nickname: currentUser.name,
        },
      ],
    })

    return { room: roomCreate }
  }
)

export const selectUserReducers = {
  [selectUserAction.pending]: (state) => {
    state.loading = true
    state.error = false
    state.room = null
  },
  [selectUserAction.rejected]: (state, action) => {
    state.loading = false
    state.error = action.error.message
    state.room = null
  },
  [selectUserAction.fulfilled]: (state, action) => {
    state.loading = false
    state.error = false
    state.room = action.payload.room
  },
}
