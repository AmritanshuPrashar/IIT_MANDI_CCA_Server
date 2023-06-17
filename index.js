const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./config/database');
const routes = require('./routes/sensorRoutes');
const cors = require("cors")
app.use(cors);

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});
