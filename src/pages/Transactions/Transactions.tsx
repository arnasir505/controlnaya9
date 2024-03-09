import React, { useCallback, useEffect } from 'react';
import TransactionsModal from '../../components/TransactionsModal/TransactionsModal';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectTransactions,
  selectTransactionsLoading,
} from '../../store/transactionsSlice/transactionsSlice';
import { fetchTransactions } from '../../store/transactionsSlice/transactionsThunks';

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectTransactionsLoading);

  const getTransactions = useCallback(async () => {
    await dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    void getTransactions();
  }, [getTransactions]);

  let content = <Spinner />;

  if (transactions.length > 0 && !isLoading) {
    content = (
      <>
        {transactions.map((transaction) => (
          <div key={transaction.id} className='card mb-3'>
            <div className='card-body d-flex justify-content-between'>
              <h4>{transaction.createdAt}</h4>
              <span>{transaction.category}</span>
              <span>{transaction.amount}</span>
            </div>
          </div>
        ))}
      </>
    );
  } else if (transactions.length === 0 && !isLoading) {
    content = (
      <h3 className='text-center pt-5 text-secondary'>
        Transactions list is empty.
      </h3>
    );
  }
  return (
    <div className='container pt-4'>
      <TransactionsModal />
      <h2 className='m-0'>Total XXX KGS</h2>
      <div className='pt-4'>
        <div className='row'>
          <div className='col'>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
