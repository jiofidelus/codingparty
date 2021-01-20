/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TechnologieItem from './TechnologieItem';

export default function Technologies() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTechs = async () => {
      setLoading(true);
      await axios
        .get('http://localhost:3003/api/technologies')
        .then((results) => {
          setTechnologies(results.data);
          setLoading(false);
        });
    };

    fetchTechs();
  }, []);

  return (
    <div className='container '>
      {console.log(loading)}
      {loading && (
        <div class='spinner-border' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      )}

      {technologies.map((techno, index) => {
        return <TechnologieItem techno={techno} />;
      })}
    </div>
  );
}
