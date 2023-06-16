const express = require('express')
const app = express()
const PORT = 4000
app.use(express.json());
// var cors = require('cors')
// app.use(cors)
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
      internal: {
        type: String
      },
      external: {
        type: String
      }
    },
    humidity: {
      internal: {
        type: String
      },
      external: {
        type: String
      }
    }
  }
});

const Sensor = mongoose.model('Sensor', sensorSchema);


app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})
app.get("/data", async (req, res) => {

  try {
    console.log("\n New Event : Fetching data from the server.")
    let data = await Sensor.find();
    res.json({
      result: data
    })
  }
  catch (err) {
    res.json({
      error: err.message
    })
  }
})

app.post("/addData", async (req, res) => {
  try {
    let data = req.body;
    console.log("\n New Event : Data to be uploaded : \n");
    console.log(data)
    let uploaded_data = await Sensor.create(data);
    res.json({
      data: uploaded_data
    })
  }
  catch (err) {
    res.json({
      error: err.message
    })
  }


})
app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app