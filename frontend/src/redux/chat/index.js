import { createSlice } from '@reduxjs/toolkit'
import { selectUserReducers, selectUserAction } from './selectUser'
import {
  selectChatError,
  selectChatLoading,
  selectCurrentRoom,
} from './selector'
import { selectRoomReducers, selectRoomAction } from './selectRoom'
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    loading: false,
    error: false,
    room: null,
  },
  reducers: {},
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
}
export default chatSlice.reducer
