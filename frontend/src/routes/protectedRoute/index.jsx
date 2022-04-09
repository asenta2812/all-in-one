import { selectIsAuthenticated } from '@redux/auth'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const isUserAuthenticated = useSelector(selectIsAuthenticated)

  if (!isUserAuthenticated) {
    return <Navigate to="/signin" />
  }
  return <Outlet />
}

export default ProtectedRoute
