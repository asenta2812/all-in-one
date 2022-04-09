import { selectIsAuthenticated } from '@redux/auth'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const isUserAuthenticated = useSelector(selectIsAuthenticated)

  if (isUserAuthenticated) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

export default PublicRoute
