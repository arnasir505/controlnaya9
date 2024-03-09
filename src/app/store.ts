import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../store/categoriesSlice/categoriesSlice';
import { categoriesModalReducer } from '../store/categoriesModalSlice/categoriesModalSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    categoriesModal: categoriesModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
