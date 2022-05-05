import React from 'react'
import reportWebVitals from './reportWebVitals'
import { Provider as StoreProvider } from 'react-redux'
import App from './App'
import Store from './redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { injectStore } from '@/client'

import { createRoot } from 'react-dom/client'

// After
injectStore(Store)
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <StoreProvider store={Store}>
    <PersistGate loading={null} persistor={persistStore(Store)}>
      <App />
    </PersistGate>
  </StoreProvider>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals()
