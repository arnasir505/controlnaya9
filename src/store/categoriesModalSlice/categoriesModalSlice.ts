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
  form: ApiCategory;
  loading: boolean;
  error: boolean;
  categoryId: string | null;
}

const initialState: CategoriesModalState = {
  show: false,
  form: {
    name: '',
    type: '',
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
    changeCategoryName: (state, {payload: name}: PayloadAction<string>) => {
      state.form.name = name;
    },
    changeCategoryType: (state, {payload: type}: PayloadAction<string>) => {
      state.form.type = type;
    },
    clearCategoriesModalForm: (state) => {
      state.form.name = '';
      state.form.type = '';
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
          state.form.name = category.name;
          state.form.type = category.type;
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
export const selectCategoriesModalName = (state: RootState) =>
  state.categoriesModal.form.name;
export const selectCategoriesModalType = (state: RootState) =>
  state.categoriesModal.form.type;
export const selectCategoriesModalLoading = (state: RootState) =>
  state.categoriesModal.loading;
export const selectCategoriesModalCategoryId = (state: RootState) =>
  state.categoriesModal.categoryId;
