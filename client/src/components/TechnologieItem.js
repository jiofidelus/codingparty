/** @format */

import React from 'react';

const TechnologieItem = ({ techno, onHeartFavoriteHandler }) => {
  return (
    <div className='card m-3' style={{ maxWidth: '100%' }}>
      <div className='row g-0'>
        <div className=' d-flex col-md-4 justify-content-center align-items-center'>
          <img
            className='img-fluid'
            src={`images/${techno.image ? techno.image : 'tech.png'}`}
            alt={techno.name}
          />
        </div>
        <div className='col-md-7'>
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
        {/* <div className='col-md-1'>
          <button
            className={techno.favorite ? 'heartredbutton' : 'heartdarkbutton'}
            onClick={(e) => {
              onHeartFavoriteHandler(e, techno);
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default TechnologieItem;
