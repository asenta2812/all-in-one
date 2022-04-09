import { createSelector } from '@reduxjs/toolkit'

export const selectAuthError = createSelector(
  (state) => state.auth.error,
  (error) => {
    if (error !== null) return error
  }
)

export const selectLoading = createSelector(
  (state) => state.auth.loading,
  (loading) => {
    if (loading !== null) return loading
  }
)

export const selectCurrentUser = createSelector(
  (state) => state.auth.user,
  (user) => {
    if (user !== null) return user
  }
)

export const selectToken = createSelector(
  (state) => state.auth.token,
  (token) => {
    if (token !== null) return token
  }
)

export const selectIsAuthenticated = createSelector(
  (state) => state.auth.user,
  (state) => state.auth.token,
  (user, token) => {
    if (user !== null && token !== null) return true
    else return false
  }
)
