import React from 'react';
import CategoriesModal from '../../components/CategoriesModal/CategoriesModal';
import { useAppDispatch } from '../../app/hooks';
import { showModal } from '../../store/categoriesModalSlice/categoriesModalSlice';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className='container pt-4'>
      <CategoriesModal />
      <div className='d-flex justify-content-between align-items-center'>
        <h2 className='m-0'>Categories</h2>
        <button
          className='btn btn-outline-dark'
          onClick={() => dispatch(showModal())}
        >
          Add
        </button>
      </div>
      <div className='pt-4'>
        <div className='row'>
          <div className='col-lg-10 col-xl-8 col-xxl-7'></div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
