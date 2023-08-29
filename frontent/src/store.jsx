import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { resumeAPI } from './service/api'

export const store = configureStore({
  reducer: {
    [resumeAPI.reducerPath]: resumeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resumeAPI.middleware),
})

setupListeners(store.dispatch)