const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
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

module.exports = Sensor;
