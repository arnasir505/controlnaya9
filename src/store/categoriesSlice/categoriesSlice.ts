import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types';

interface CategoriesState {
  items: Category[];
  deleteId: string | null;
  loading: boolean;
  error: boolean;
}

const initialState: CategoriesState = {
  items: [],
  deleteId: null,
  loading: false,
  error: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export const categoriesReducer = categoriesSlice.reducer;
