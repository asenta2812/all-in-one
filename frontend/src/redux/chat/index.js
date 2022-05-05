import { createSlice } from '@reduxjs/toolkit'
import { selectUserReducers, selectUserAction } from './selectUser'
import {
  selectChatError,
  selectChatLoading,
  selectCurrentRoom,
  selectCurrentCall,
} from './selector'
import { selectRoomReducers, selectRoomAction } from './selectRoom'

const initialState = {
  loading: false,
  error: false,
  room: null,
  call: null,
}
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: () => initialState,
    callAction: (state, { payload }) => {
      state.call = { ...payload }
      return state
    },
  },
  extraReducers: {
    ...selectUserReducers,
    ...selectRoomReducers,
  },
})

export {
  selectUserAction,
  selectRoomAction,
  selectChatError,
  selectChatLoading,
  selectCurrentRoom,
  selectCurrentCall,
}
export const { reset: resetStateChat, callAction } = chatSlice.actions
export default chatSlice.reducer
