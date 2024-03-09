import React from 'react';
import editIcon from '../../assets/pencil-square.svg';
import trashIcon from '../../assets/trash3.svg';
import { useAppDispatch } from '../../app/hooks';
import {
  setCategoryId,
  showModal,
} from '../../store/categoriesModalSlice/categoriesModalSlice';

interface Props {
  id: string;
  name: string;
  type: string;
}

const CategoryItem: React.FC<Props> = ({ id, name, type }) => {
  const dispatch = useAppDispatch();
  return (
    <div className='card mb-2'>
      <div className='card-body d-flex justify-content-end align-items-center'>
        <h5 className='m-0 me-auto'>{name}</h5>
        <span
          className={`fw-bold ${
            type === 'income' ? 'text-success' : 'text-danger'
          }`}
        >
          {type}
        </span>
        <button
          className='btn ms-3'
          onClick={() => (dispatch(showModal()), dispatch(setCategoryId(id)))}
        >
          <img src={editIcon} alt='edit' />
        </button>
        <button className='btn ms-2'>
          <img src={trashIcon} alt='delete' />
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
