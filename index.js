const express = require('express')
const app = express()
const PORT = 4000
app.use(express.json());
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://amri07:amri07@cluster0.oomopds.mongodb.net/?retryWrites=true&w=majority", {
  dbName: "IITMandi_Project",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const sensorSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now()
  },
  data: {
    temperature: {
      type: String,
    },
    pressure: {
      type: String,
    },
    humidity: {
      type: String,
    }
  }
});

const Sensor = mongoose.model('Sensor', sensorSchema);


app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})
app.get("/data", async (req, res) => {
  let data = await Sensor.find();
  res.json({
    result: data
  })
})

app.post("/addData", async (req, res) => {
  let data = req.body;
  console.log(data);
  let uploaded_data = await Sensor.create(data);
  res.json({
    data: uploaded_data
  })

})
app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app