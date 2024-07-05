import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer = combineReducers({ todoSlice })

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
});
