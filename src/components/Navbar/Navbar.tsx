import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className='navbar shadow-sm'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Finance Tracker
        </Link>
        <div className='d-flex gap-3'>
          <NavLink
            className='nav-link text-decoration-underline text-primary'
            to='/categories'
          >
            Categories
          </NavLink>
          <button className='nav-link text-decoration-underline text-primary'>
            Add
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
