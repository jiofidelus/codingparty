/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const activeStyle = { color: '#F15B2A' };

  return (
    <nav class='navbar navbar-expand-lg navba-dark bg-light'>
      <div class='container-fluid'>
        <NavLink exact activeStyle={activeStyle} className='nav-link' to='/'>
          Acceuil
        </NavLink>
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
              <NavLink
                className='nav-link'
                activeStyle={activeStyle}
                to='/technologies'
              >
                Technologies
              </NavLink>
            </li>
            <li class='nav-item'>
              <NavLink
                to='suggestions'
                className='nav-link'
                activeStyle={activeStyle}
              >
                Suggestions
              </NavLink>
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
