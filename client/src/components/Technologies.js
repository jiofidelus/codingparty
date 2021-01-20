/** @format */

import React from 'react';
import TechnologiesData from '../Data';

export default function Technologies() {
  return (
    <div className='container '>
      {TechnologiesData.map((techno, index) => {
        return (
          <div className='card m-3' style={{ maxWidth: '100%' }}>
            <div className='row g-0'>
              <div className='col-md-4 text-center'>
                <img src={techno.image} alt={techno.name} />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title'>{techno.name}</h5>
                  <p className='card-text'>{techno.description}</p>
                  <p className='card-text'>
                    <small className='text-muted'>{techno.speaker}</small>
                  </p>
                  <p className='card-text'>
                    <small className='text-muted'>
                      Date de presentation: {techno.date}{' '}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
