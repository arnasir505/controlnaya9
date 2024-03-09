import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addTransaction } from './transactionModalThunks';

interface TransactionModalState {
  show: boolean;
  type: string;
  form: { category: string; amount: number | null; createdAt: string };
  transactionId: string | null;
  loading: boolean;
  error: boolean;
}

const initialState: TransactionModalState = {
  show: false,
  type: '',
  form: {
    category: '',
    amount: null,
    createdAt: '',
  },
  transactionId: null,
  loading: false,
  error: false,
};

const transactionModalSlice = createSlice({
  name: 'transactionModal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.show = true;
    },
    closeModal: (state) => {
      state.show = false;
      state.transactionId = null;
    },
    changeTransactionType: (
      state,
      { payload: type }: PayloadAction<string>
    ) => {
      state.type = type;
    },
    changeTransactionCategory: (
      state,
      { payload: category }: PayloadAction<string>
    ) => {
      state.form.category = category;
    },
    changeTransactionAmount: (
      state,
      { payload: amount }: PayloadAction<string>
    ) => {
      state.form.amount = Number(amount);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTransaction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTransaction.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const transactionModalReducer = transactionModalSlice.reducer;
export const {
  showModal,
  closeModal,
  changeTransactionType,
  changeTransactionCategory,
  changeTransactionAmount,
} = transactionModalSlice.actions;
export const selectTransactionModalShow = (state: RootState) =>
  state.transactionModal.show;
export const selectTransactionModalLoading = (state: RootState) =>
  state.transactionModal.loading;
export const selectTransactionModalType = (state: RootState) =>
  state.transactionModal.type;
export const selectTransactionModalCategory = (state: RootState) =>
  state.transactionModal.form.category;
export const selectTransactionModalAmount = (state: RootState) =>
  state.transactionModal.form.amount;
