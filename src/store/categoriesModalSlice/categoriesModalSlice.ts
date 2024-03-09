import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  addCategory,
  fetchCategory,
  updateCategory,
} from './categoriesModalThunks';
import { ApiCategory } from '../../types';

interface CategoriesModalState {
  show: boolean;
  form: { categoryName: string; categoryType: string };
  loading: boolean;
  error: boolean;
  categoryId: string | null;
}

const initialState: CategoriesModalState = {
  show: false,
  form: {
    categoryName: '',
    categoryType: '',
  },
  loading: false,
  error: false,
  categoryId: null,
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
      state.categoryId = null;
    },
    changeCategoryName: (state, action: PayloadAction<string>) => {
      state.form.categoryName = action.payload;
    },
    changeCategoryType: (state, action: PayloadAction<string>) => {
      state.form.categoryType = action.payload;
    },
    clearCategoriesModalForm: (state) => {
      state.form.categoryName = '';
      state.form.categoryType = '';
    },
    setCategoryId: (state, { payload: id }: PayloadAction<string>) => {
      state.categoryId = id;
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
      })
      .addCase(addCategory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchCategory.fulfilled,
        (state, { payload: category }: PayloadAction<ApiCategory>) => {
          state.loading = false;
          state.form.categoryName = category.name;
          state.form.categoryType = category.type;
        }
      )
      .addCase(fetchCategory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const categoriesModalReducer = categoriesModalSlice.reducer;
export const {
  showModal,
  closeModal,
  changeCategoryName,
  changeCategoryType,
  clearCategoriesModalForm,
  setCategoryId,
} = categoriesModalSlice.actions;
export const selectCategoriesModalShow = (state: RootState) =>
  state.categoriesModal.show;
export const selectCategoriesModalCategoryName = (state: RootState) =>
  state.categoriesModal.form.categoryName;
export const selectCategoriesModalCategoryType = (state: RootState) =>
  state.categoriesModal.form.categoryType;
export const selectCategoriesModalLoading = (state: RootState) =>
  state.categoriesModal.loading;
export const selectCategoriesModalCategoryId = (state: RootState) =>
  state.categoriesModal.categoryId;
