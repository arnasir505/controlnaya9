import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiCategory } from '../../types';
import { RootState } from '../../app/store';

export const addCategory = createAsyncThunk<void, ApiCategory>(
  'categoriesModal/add',
  async (category) => {
    try {
      await axiosApi.post('/categories.json', category);
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  'categoriesModal/fetch',
  async (id: string) => {
    const { data: category } = await axiosApi.get<ApiCategory | null>(
      '/categories/' + id + '.json'
    );
    if (!category) {
      throw new Error('Not Found');
    }
    return category;
  }
);

export const updateCategory = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('categoriesModal/update', async (id: string, thunkApi) => {
  try {
    const updatedCategory = thunkApi.getState().categoriesModal.form;
    await axiosApi.put('/categories/' + id + '.json', {
      name: updatedCategory.categoryName,
      type: updatedCategory.categoryType,
    });
  } catch (error) {
    console.log(error);
  }
});
