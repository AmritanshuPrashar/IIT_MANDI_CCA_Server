const express = require('express')
const mongoose = require('mongoose');
const app = express()
const PORT = 4000


// mongoose.connect("mongodb+srv://amri07:amri07@cluster0.oomopds.mongodb.net/?retryWrites=true&w=majority", {
//     dbName: "IITMandi_Project",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   const db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//   db.once('open', () => {
//     console.log('Connected to MongoDB');
//   });


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
      pressure: {
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


app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app