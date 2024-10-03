// redux/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { Wine } from '../../interface/wine';

const initialState = {
  wine: {} as Wine,
  wines: [
    {
      id: 1,
      name: 'Wine 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description of wine 1',
    },
    {
      id: 2,
      name: 'Wine 2',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description of wine 2',
    },
    {
      id: 3,
      name: 'Wine 3',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description of wine 3',
    },
  ]
};

const wineSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setWine: (state, action) => {
      state.wine = action.payload;
    },
    addWine: (state, action) => {
      state.wines = [...state.wines, action.payload]; // Añade el nuevo vino
    },
    setWines: (state, action) => {
      state.wines = action.payload; // Para reemplazar toda la lista, si es necesario
    }
  },
});

export const { setWine, setWines, addWine } = wineSlice.actions;
export default wineSlice.reducer;
