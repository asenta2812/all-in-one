import Landing from '@pages/landing'
import Signin from '@pages/signin'
import Signup from '@pages/signup'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import PublicRoute from './publicRoute'
import Chat from '@pages/chat'
import NotFound from '@pages/not-found'

// import { NotFound } from "@layouts";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route element={<PublicRoute />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Route>
    <Route element={<ProtectedRoute />}>
      <Route path="/chat" element={<Chat />} />
    </Route>
    {/* <ProtectedRoute exact path="/home" component={(props) => <Home {...props} />} />  */}

    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes
