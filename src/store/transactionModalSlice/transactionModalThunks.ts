import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiTransaction } from '../../types';
import axiosApi from '../../axiosApi';

export const addTransaction = createAsyncThunk<void, ApiTransaction>(
  'transactionModal/add',
  async (transaction) => {
    try {
      await axiosApi.post('/transactions.json', transaction);
    } catch (error) {
      console.log(error);
    }
  }
);
