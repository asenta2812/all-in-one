import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider as StoreProvider } from 'react-redux'
import Store from './redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
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
