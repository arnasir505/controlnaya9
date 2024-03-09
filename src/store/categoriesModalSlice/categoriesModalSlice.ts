import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

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
  },
});

export const categoriesModalReducer = categoriesModalSlice.reducer;
export const { showModal, closeModal } = categoriesModalSlice.actions;
export const selectCategoriesModalShow = (state: RootState) =>
  state.categoriesModal.show;
