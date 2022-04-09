import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import App from './App'
import Store from './redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { injectStore } from '@/client'

injectStore(Store)
ReactDOM.render(
  <StoreProvider store={Store}>
    <PersistGate loading={null} persistor={persistStore(Store)}>
      <App />
    </PersistGate>
  </StoreProvider>,
  document.getElementById('root')
)
