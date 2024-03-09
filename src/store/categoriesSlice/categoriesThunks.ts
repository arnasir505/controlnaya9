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

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id: string) => {
    try {
      await axiosApi.delete('/categories/' + id + '.json');
    } catch (error) {
      console.log(error);
    }
  }
);
