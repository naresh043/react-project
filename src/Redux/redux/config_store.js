// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 
import searchReducer from "../features/searchSlice"

const persistConfig = {
  key: 'root', // The key to store data in localStorage
  storage,     // Use localStorage
 
};

const persistedReducer = persistReducer(persistConfig, searchReducer);

export const store = configureStore({
  reducer: {
    search: persistedReducer,
  },
});
export const persistor = persistStore(store);
