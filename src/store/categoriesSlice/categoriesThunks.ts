import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiCategories } from '../../types';

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const { data: categories } = await axiosApi.get<ApiCategories | null>(
      '/categories.json'
    );
    if (!categories) {
      throw new Error('Not Found');
    }
    return categories;
  }
);
