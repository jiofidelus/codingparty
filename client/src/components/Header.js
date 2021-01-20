/** @format */

import React from 'react';

const Header = () => {
  return (
    <div className='container-fluid header'>
      <div className='row'>
        <div className='d-flex col-md-6 mh-100 justify-content-center align-items-center '>
          <div>
            <h6> JANVIER 20-01-20</h6>
            <h6>YAOUNDE CAMEROUN</h6>
          </div>
        </div>
        <div className='col-md-6 text-center'>
          <div>
            <img
              width='150'
              height='150'
              className='rounded mx-auto d-block'
              src='images/uy1.jpeg'
              alt='Universite de Yaounde I'
            />
          </div>
          <h6>YAOUNDE Tech Conference 2021 </h6>
        </div>
      </div>
    </div>
  );
};

export default Header;
