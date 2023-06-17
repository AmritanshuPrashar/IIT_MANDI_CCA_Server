const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./config/database');
const userRoutes = require('./routes/userRoutes')
const sensorRoutes = require('./routes/sensorRoutes');
// const cors = require("cors")
// app.use(cors);

app.use(express.json());
app.use('/', sensorRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});
