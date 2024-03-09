import React from 'react';
import TransactionsModal from '../../components/TransactionsModal/TransactionsModal';

const Transactions: React.FC = () => {
  return (
    <div className='container pt-4'>
      <TransactionsModal />
      <h2 className='m-0'>Total XXX KGS</h2>
      <div className='pt-4'>
        <div className='row'>
          <div className='col'>items</div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
