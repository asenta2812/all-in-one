import { createSelector } from '@reduxjs/toolkit'

export const selectChatError = createSelector(
  (state) => state.chat.error,
  (error) => {
    if (error !== null) return error
  }
)

export const selectChatLoading = createSelector(
  (state) => state.chat.loading,
  (loading) => {
    if (loading !== null) return loading
  }
)

export const selectCurrentRoom = createSelector(
  (state) => state.chat.room,
  (room) => {
    if (room !== null) return room
  }
)
