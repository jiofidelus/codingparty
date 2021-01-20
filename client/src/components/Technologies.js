/** @format */

import React from 'react';
import TechnologiesData from '../Data';
import TechnologieItem from './TechnologieItem';

export default function Technologies() {
  return (
    <div className='container '>
      {TechnologiesData.map((techno, index) => {
        return <TechnologieItem techno={techno} />;
      })}
    </div>
  );
}
