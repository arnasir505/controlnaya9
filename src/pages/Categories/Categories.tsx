import React, { useCallback, useEffect } from 'react';
import CategoriesModal from '../../components/CategoriesModal/CategoriesModal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  showModal,
} from '../../store/categoriesModalSlice/categoriesModalSlice';
import Spinner from '../../components/Spinner/Spinner';
import { fetchCategories } from '../../store/categoriesSlice/categoriesThunks';
import {
  selectCategories,
  selectCategoriesLoading,
} from '../../store/categoriesSlice/categoriesSlice';
import CategoryItem from '../../components/CategoryItem/CategoryItem';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);

  const getCategories = useCallback(async () => {
    await dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    void getCategories();
  }, [getCategories]);

  let content = <Spinner />;

  if (categories.length > 0 && !isLoading) {
    content = (
      <>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            id={category.id}
            name={category.name}
            type={category.type}
          />
        ))}
      </>
    );
  } else if (categories.length === 0 && !isLoading) {
    content = (
      <h3 className='text-center pt-5 text-secondary'>
        Categories list is empty.
      </h3>
    );
  }

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
          <div className='col'>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
