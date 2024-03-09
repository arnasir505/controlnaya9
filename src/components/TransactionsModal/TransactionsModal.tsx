import React, { useCallback, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeTransactionAmount,
  changeTransactionCategory,
  changeTransactionType,
  closeModal,
  selectTransactionModalAmount,
  selectTransactionModalCategory,
  selectTransactionModalLoading,
  selectTransactionModalShow,
  selectTransactionModalType,
} from '../../store/transactionModalSlice/transactionModalSlice';
import { selectCategories } from '../../store/categoriesSlice/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice/categoriesThunks';
import { ApiTransaction } from '../../types';
import { addTransaction } from '../../store/transactionModalSlice/transactionModalThunks';

const TransactionsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectTransactionModalShow);
  const transactionType = useAppSelector(selectTransactionModalType);
  const transactionCategory = useAppSelector(selectTransactionModalCategory);
  const transactionAmount = useAppSelector(selectTransactionModalAmount);
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectTransactionModalLoading);

  const categoryOptions = categories.filter(
    (category) => category.type === transactionType
  );

  const getCategoryOptions = useCallback(async () => {
    await dispatch(fetchCategories());
  }, [transactionType]);

  useEffect(() => {
    void getCategoryOptions();
  }, [getCategoryOptions]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionAmount) {
      const transaction: ApiTransaction = {
        category: transactionCategory,
        amount: Math.abs(transactionAmount),
        createdAt: new Date().toISOString(),
      };
      await dispatch(addTransaction(transaction));
    }
    dispatch(closeModal());
  };

  return (
    <Modal show={show} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense/Income</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className='mb-3'>
            <label htmlFor='transactionType'>Type</label>
            <select
              className='form-select'
              id='transactionType'
              name='transactionType'
              required
              value={transactionType}
              onChange={(e) => dispatch(changeTransactionType(e.target.value))}
            >
              <option disabled value=''>
                Choose...
              </option>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='transactionCategory'>Category</label>
            <select
              className='form-select'
              id='transactionCategory'
              name='transactionCategory'
              required
              value={transactionCategory}
              onChange={(e) =>
                dispatch(changeTransactionCategory(e.target.value))
              }
            >
              <option disabled value=''>
                Choose...
              </option>
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='transactionAmount'>Amount</label>
            <div className='d-flex align-items-center gap-2'>
              <input
                type='number'
                className='form-control w-auto'
                id='transactionAmount'
                name='transactionAmount'
                required
                value={transactionAmount || ''}
                onChange={(e) =>
                  dispatch(changeTransactionAmount(e.target.value))
                }
              />
              <span className='fw-bold'>KGS</span>
            </div>
          </div>
          <div className='d-flex justify-content-end gap-2'>
            <button className='btn btn-secondary' disabled={isLoading}>
              Cancel
            </button>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className='spinner-border spinner-border-sm'
                    aria-hidden='true'
                  ></span>
                  <span className='visually-hidden' role='status'>
                    Loading...
                  </span>
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionsModal;
