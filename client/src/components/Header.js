/** @format */

import React from 'react';

const Header = () => {
  return (
    <div className='container-fluid header'>
      <div className='row'>
        <div className='d-flex col-md-6 mh-100 justify-content-center align-items-center '>
          <div>
            <h6>JANVIER 20-01-20</h6>
            <h6>YAOUNDE, CAMEROUN</h6>
          </div>
        </div>
        <div className='col-md-6 text-center'>
          <div>
            <img
              width='100'
              height='100'
              className='rounded mx-auto d-block'
              src='images/uy1.jpeg'
              alt='Universite de Yaounde I'
            />
          </div>
          <h3>YAOUNDE Code Camp 2021 </h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
