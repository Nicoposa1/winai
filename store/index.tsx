// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice'; // Ejemplo de un reducer
import wineReducer from './slice/wineSlice'; // Ejemplo de un reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wine: wineReducer,
  },
});
