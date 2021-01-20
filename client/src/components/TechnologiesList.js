/** @format */

import React from 'react';
import TechnologieItem from './TechnologieItem';

function TechnologiesList({ technos }) {
  const keys = Object.keys(technos);

  console.log(keys);
  return (
    <div>
      {keys.map((key, index) => {
        return <TechnologieItem key={index} techno={technos[key]} />;
      })}
    </div>
  );
}

export default TechnologiesList;
