/** @format */

const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const psql = new Client({
  user: '',
  host: '',
  password: '',
  database: '',
});

psql.connect();

router.get('/technologies', async (req, res) => {
  const result = await psql.query({
    text: 'SELECT * from technologies order by id DESC ',
  });
  setTimeout(() => {
    res.json(result.rows);
  }, 3000);
});

router.post('/technologies', async (req, res) => {
  const { name, description, date, speaker } = req.body;

  const result = await psql.query({
    text: `INSERT INTO technologies(name, description, date, speaker)
    VALUES ($1, $2, $3, $4) 
    RETURNING *
    `,
    values: [name, description, date, speaker],
  });

  const id = result.rows[0].id;

  res.json({ id, name, description, date, speaker });
});

router.delete('/technologies', async (req, res) => {
  const { id } = req.body;
});

module.exports = router;
