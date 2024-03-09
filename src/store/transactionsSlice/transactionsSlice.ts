import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiTransactions, Transaction } from '../../types';
import { fetchTransactions } from './transactionsThunks';
import { RootState } from '../../app/store';

interface TransactionsState {
  items: Transaction[];
  deleteId: string | null;
  loading: boolean;
  error: boolean;
}

const initialState: TransactionsState = {
  items: [],
  deleteId: null,
  loading: false,
  error: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, { payload: transactions }: PayloadAction<ApiTransactions>) => {
          state.loading = false;
          state.items = Object.keys(transactions).map((id) => ({
            ...transactions[id],
            id,
          }));
        }
      )
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.items = [];
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTransactionsLoading = (state: RootState) => state.transactions.loading;