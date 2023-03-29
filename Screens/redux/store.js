// import { createStore, combineReducers } from 'redux';
 import rootReducer from './reducer';

// const configureStore = () => {
// return createStore(rootReducer);
// }
// export default configureStore;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

import { createStore } from 'redux'



const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
  whitelist: ['envInfo'] 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)