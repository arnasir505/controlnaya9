import React from 'react';
import { Modal } from 'react-bootstrap';
import {
  changeCategoryName,
  changeCategoryType,
  closeModal,
  selectCategoriesModalCategoryName,
  selectCategoriesModalCategoryType,
  selectCategoriesModalLoading,
  selectCategoriesModalShow,
} from '../../store/categoriesModalSlice/categoriesModalSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCategory } from '../../store/categoriesModalSlice/categoriesModalThunks';
import { fetchCategories } from '../../store/categoriesSlice/categoriesThunks';

const CategoriesModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectCategoriesModalShow);
  const categoryName = useAppSelector(selectCategoriesModalCategoryName);
  const categoryType = useAppSelector(selectCategoriesModalCategoryType);
  const isLoading = useAppSelector(selectCategoriesModalLoading);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addCategory({ name: categoryName, type: categoryType }));
    dispatch(closeModal());
    await dispatch(fetchCategories());
  };

  return (
    <Modal show={show} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className='mb-3'>
            <label htmlFor='categoryName'>Name</label>
            <input
              type='text'
              className='form-control'
              id='categoryName'
              name='categoryName'
              required
              value={categoryName}
              onChange={(e) => dispatch(changeCategoryName(e.target.value))}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='categoryType'>Type</label>
            <select
              className='form-select'
              id='categoryType'
              name='categoryType'
              required
              value={categoryType}
              onChange={(e) => dispatch(changeCategoryType(e.target.value))}
            >
              <option disabled value=''>
                Choose...
              </option>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
          </div>
          <button
            className='btn btn-primary w-100 mt-1'
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
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoriesModal;
