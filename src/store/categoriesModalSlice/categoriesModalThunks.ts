import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiCategory } from '../../types';

export const addCategory = createAsyncThunk<void, ApiCategory>(
  'categoriesModal/add',
  async (category) => {
    try {
      await axiosApi.post<ApiCategory>('/categories.json', category);
    } catch (error) {
      console.log(error);
    }
  }
);
