const express = require('express');

const app1 = express();
const app2 = express();

app1.get('/', (req, res) => {
  res.send('Hello from App 1!');
});

app2.get('/', (req, res) => {
  res.send('Hello from App 2!');
});

const port1 = 3000;
const port2 = 4000;

app1.listen(port1, () => {
  console.log(`App 1 listening at http://localhost:${port1}`);
});

app2.listen(port2, () => {
  console.log(`App 2 listening at http://localhost:${port2}`);
});
