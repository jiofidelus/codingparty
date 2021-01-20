/** @format */

const express = require('express');
const app = express();
const logger = require('morgan');
const cookiePaser = require('cookie-parser');

const port = 3003;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.get('/', (req, res) => {
  res.send('Tech conference API');
});

app.listen(port, () => {
  console.log(`Tech app listening at http://localhost:${port}`);
});
