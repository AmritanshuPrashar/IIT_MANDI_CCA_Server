const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./config/database');
const userRoutes = require('./routes/userRoutes')
const sensorRoutes = require('./routes/sensorRoutes');
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const csv = require('csv-parser');
const fs = require('fs');
app.use(cookieParser());
// Enable CORS
app.use(cors());
app.use(session({
  secret: 'IITMANDI',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/', sensorRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});
