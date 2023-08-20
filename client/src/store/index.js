import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { bringStoreToWs } from '../api/ws';

const store = configureStore({ reducer: rootReducer });

bringStoreToWs(store);

export default store;
