/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav class='navbar navbar-expand-lg navba-dark bg-light'>
      <div class='container-fluid'>
        <Link className='nav-brand' to='/'>
          Acceuil
        </Link>
        <button
          class='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
            <li class='nav-item'>
              <Link className='nav-link' to='/technologies'>
                Technologies
              </Link>
            </li>
            <li class='nav-item'>
              <Link to='suggestions' className='nav-link'>
                Suggestions
              </Link>
            </li>
          </ul>
          <form class='d-flex'>
            <input
              class='form-control me-2'
              type='search'
              placeholder='Faites une recherche'
              aria-label='Search'
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
