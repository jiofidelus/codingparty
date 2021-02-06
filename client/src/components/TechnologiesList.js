/** @format */

import React from 'react';
import TechnologieItem from './TechnologieItem';

function TechnologiesList({ technos }) {
  const keys = Object.keys(technos);

  const toggleSpeakerFavorite = () => {};

  const heartFavoriteHandler = (e, techno) => {
    e.preventDefault();
    toggleSpeakerFavorite(techno);
  };

  return (
    <div>
      {keys.map((key, index) => {
        return (
          <TechnologieItem
            onHeartFavoriteHandler={heartFavoriteHandler}
            key={index}
            techno={technos[key]}
          />
        );
      })}
    </div>
  );
}

export default TechnologiesList;
