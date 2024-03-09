import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiTransactions } from '../../types';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async () => {
    const { data: transactions } = await axiosApi.get<ApiTransactions | null>(
      '/transactions.json'
    );
    if (!transactions) {
      throw new Error('Not Found');
    }
    return transactions;
  }
);
