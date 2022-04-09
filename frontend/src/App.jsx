import '@assets/css/style.css'
import 'antd/dist/antd.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
