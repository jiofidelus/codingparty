/** @format */

import React from 'react';

function Suggestions() {
  return (
    <div className='container'>
      <h2>Proposer une technologie</h2>
      <form>
        <div class='mb-3'>
          <label for='exampleInputEmail1' class='form-label'>
            Nom de la technologie
          </label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div class='mb-3'>
          <label for='exampleInputEmail1' class='form-label'>
            Description
          </label>
          <textarea
            class='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div class='mb-3'>
          <label for='exampleInputEmail1' class='form-label'>
            Date
          </label>
          <input
            type='date'
            class='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div class='mb-3'>
          <label for='exampleInputPassword1' class='form-label'>
            Presentateur
          </label>
          <select
            class='form-select form-select-lg mb-3'
            aria-label='.form-select-lg example'
          >
            <option selected>Veuillez choisir un speaker</option>
            <option value='1'>REGIS ATEMENGUE</option>
            <option value='2'>PALMA PALMA</option>
            <option value='3'>ABOUAM PROPSER</option>
          </select>
        </div>

        <button type='submit' class='btn btn-primary'>
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default Suggestions;
