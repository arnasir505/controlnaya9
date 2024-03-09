import React from 'react';
import { Modal } from 'react-bootstrap';
import {
  closeModal,
  selectCategoriesModalShow,
} from '../../store/categoriesModalSlice/categoriesModalSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const CategoriesModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectCategoriesModalShow);

  return (
    <Modal show={show} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>Add Category</Modal.Header>
      <Modal.Body>modal text</Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary'>Save</button>
        <button
          className='btn btn-secondary'
          onClick={() => dispatch(closeModal())}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoriesModal;
