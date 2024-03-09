import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiCategories, Category } from '../../types';
import { deleteCategory, fetchCategories } from './categoriesThunks';
import { RootState } from '../../app/store';

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, { payload: categories }: PayloadAction<ApiCategories>) => {
          state.loading = false;
          state.items = Object.keys(categories).map((id) => ({
            ...categories[id],
            id,
          }));
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.items = [];
      });
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesLoading = (state: RootState) =>
  state.categories.loading;
