import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addCategory } from './categoriesModalThunks';

interface CategoriesModalState {
  show: boolean;
  form: { categoryName: string; categoryType: string };
  loading: boolean;
  error: boolean;
}

const initialState: CategoriesModalState = {
  show: false,
  form: {
    categoryName: '',
    categoryType: '',
  },
  loading: false,
  error: false,
};

const categoriesModalSlice = createSlice({
  name: 'categoriesModal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.show = true;
    },
    closeModal: (state) => {
      state.show = false;
    },
    changeCategoryName: (state, action: PayloadAction<string>) => {
      state.form.categoryName = action.payload;
    },
    changeCategoryType: (state, action: PayloadAction<string>) => {
      state.form.categoryType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false;
        state.form = {
          categoryName: '',
          categoryType: '',
        };
      })
      .addCase(addCategory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const categoriesModalReducer = categoriesModalSlice.reducer;
export const { showModal, closeModal, changeCategoryName, changeCategoryType } =
  categoriesModalSlice.actions;
export const selectCategoriesModalShow = (state: RootState) =>
  state.categoriesModal.show;
export const selectCategoriesModalCategoryName = (state: RootState) =>
  state.categoriesModal.form.categoryName;
export const selectCategoriesModalCategoryType = (state: RootState) =>
  state.categoriesModal.form.categoryType;
export const selectCategoriesModalLoading = (state: RootState) =>
  state.categoriesModal.loading;
