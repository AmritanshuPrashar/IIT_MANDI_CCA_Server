const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  data: {
    temperature: {
      internal: {
        Sensor1: { type: String },
        Sensor2: { type: String },
        Sensor3: { type: String },
        Sensor4: { type: String },
        Sensor5: { type: String },
        Sensor6: { type: String },
        Sensor7: { type: String },
        Sensor8: { type: String },
      },
      external: {
        Sensor1: { type: String },
        Sensor2: { type: String },
        Sensor3: { type: String },
        Sensor4: { type: String },
        Sensor5: { type: String },
        Sensor6: { type: String },
        Sensor7: { type: String },
        Sensor8: { type: String },
      }
    },
    humidity: {
      internal: {
        Sensor1: { type: String },
        Sensor2: { type: String },
        Sensor3: { type: String },
        Sensor4: { type: String },
        Sensor5: { type: String },
        Sensor6: { type: String },
        Sensor7: { type: String },
        Sensor8: { type: String },
      },
      external: {
        Sensor1: { type: String },
        Sensor2: { type: String },
        Sensor3: { type: String },
        Sensor4: { type: String },
        Sensor5: { type: String },
        Sensor6: { type: String },
        Sensor7: { type: String },
        Sensor8: { type: String },
      }
    }
  }
});



const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
