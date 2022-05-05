import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import authReducers from './auth'
import chatReducers from './chat'

const chatPersistConfig = {
  key: 'chat',
  storage,
  blacklist: ['call'],
}

const rootReducers = combineReducers({
  auth: authReducers,
  chat: persistReducer(chatPersistConfig, chatReducers),
})
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: ['chat'],
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store
