/** @format */

import axios from 'axios';
import pickBy from 'lodash.pickby';
import React, { useEffect, useState } from 'react';
import TechnologiesList from './TechnologiesList';

export default function Technologies() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value.target.value);
  };

  const filterItems = (items) => {
    let technologies = items;

    if (searchTerm) {
      technologies = pickBy(technologies, (value, key) => {
        return (
          value.name.match(searchTerm) || value.description.match(searchTerm)
        );
      });
    }
    return technologies;
  };

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
      {!loading && (
        <div className='container'>
          <div className='row m-5'>
            <input
              required
              name='searchTech'
              value={searchTerm}
              type='search'
              class='form-control'
              id='input
              requiredmail'
              onChange={handleSearch}
              placeholder='Recherchez un Stack'
            />
          </div>
        </div>
      )}
      {loading && (
        <div className='d-flex justify-content-center'>
          <div class='spinner-grow' role='status'>
            <span class='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}

      <div>
        <TechnologiesList technos={filterItems(technologies)} />
      </div>
    </div>
  );
}
