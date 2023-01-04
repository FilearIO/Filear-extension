import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'

import Storage from '@shared/borwser/storage'

import appReducer from './app/slice'
import walletReducer from './wallet/slice'
import historyReducer from './history/slice'
import priceReducer from './price/slice'
import netwrokReducer from './network/slice'
import uploadReducer from './upload/slice'

const persistConfig = {
  key: 'views:',
  storage: new Storage(),
  whitelist: ['wallet', 'price'],
}

const reducers = combineReducers({
  app: appReducer,
  wallet: walletReducer,
  history: historyReducer,
  price: priceReducer,
  network: netwrokReducer,
  upload: uploadReducer,
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'upload/setFiles'],
        ignoredPaths: ['upload.files'],
      },
    }),
})
export const persistedStore = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
