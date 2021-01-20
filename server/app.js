/** @format */

const express = require('express');
const app = express();

const port = 3003;

app.get('/', (req, res) => {
  res.send('Tech conference API');
});

app.listen(port, () => {
  console.log(`Tech app listening at http://localhost:${port}`);
});
