require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect('mongodb://amri07:amri07@ac-scyyw6d-shard-00-00.m28ixj3.mongodb.net:27017,ac-scyyw6d-shard-00-01.m28ixj3.mongodb.net:27017,ac-scyyw6d-shard-00-02.m28ixj3.mongodb.net:27017/?ssl=true&replicaSet=atlas-rwro3h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
