/** @format */

import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Suggestions = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [speaker, setSpeaker] = useState('');

  const clearInput = () => {
    setName('');
    setDescription('');
    setDate();
    setSpeaker('');
  };

  const onSave = async (event) => {
    event.preventDefault();
    await axios
      .post('http://localhost:3003/api/technologies', {
        name,
        description,
        date,
        speaker,
      })
      .then(() => {
        toast.success('Suggestion ajoute');
        clearInput();
      })
      .catch((error) => {
        toast.error('Erreur verifie les champs');
      });
  };

  return (
    <div className='container'>
      <h2>Proposer une technologie</h2>
      <form onSubmit={onSave}>
        <div class='mb-3'>
          <label for='inputmail' class='form-label'>
            Nom de la technologie
          </label>
          <input
            required
            value={name}
            type='text'
            class='form-control'
            id='input
              requiredmail'
            onChange={(value) => setName(value.target.value)}
          />
        </div>
        <div class='mb-3'>
          <label for='textareadescription' class='form-label'>
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(description) => setDescription(description.target.value)}
            class='form-control'
            id='textareadescription'
            aria-describedby='emailHelp'
          />
        </div>
        <div class='mb-3'>
          <label for='inputDate' class='form-label'>
            Date
          </label>
          <input
            required
            type='date'
            value={date}
            class='form-control'
            id='inputDate'
            aria-describedby='emailHelp'
            onChange={(date) => setDate(date.target.value)}
          />
        </div>
        <div class='mb-3'>
          <label for='exampleInputPassword1' class='form-label'>
            Presentateur
          </label>
          <select
            required
            class='form-select form-select-lg mb-3'
            aria-label='.form-select-lg example'
            defaultValue={1}
            value={speaker}
            onChange={(data) => setSpeaker(data.target.value)}
          >
            <option selected>Veuillez choisir un speaker</option>
            <option value='REGIS ATEMENGUE'>REGIS ATEMENGUE</option>
            <option value='PALMA PALMA'>PALMA PALMA</option>
            <option value='PROSPER'>ABOUAM PROPSER</option>
          </select>
        </div>

        <button type='submit' class='btn btn-primary'>
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default Suggestions;
