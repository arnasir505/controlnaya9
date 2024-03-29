import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../store/categoriesSlice/categoriesSlice';
import { categoriesModalReducer } from '../store/categoriesModalSlice/categoriesModalSlice';
import { transactionModalReducer } from '../store/transactionModalSlice/transactionModalSlice';
import { transactionsReducer } from '../store/transactionsSlice/transactionsSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    categoriesModal: categoriesModalReducer,
    transactions: transactionsReducer,
    transactionModal: transactionModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
