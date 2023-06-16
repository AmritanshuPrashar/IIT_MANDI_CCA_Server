const Sensor = require('../models/sensorModel');

exports.getData = async (req, res) => {
  try {
    console.log("\n New Event : Fetching data from the server.");
    let data = await Sensor.find();
    res.status(200).json({
      result: data
    });
  } catch (err) {
    res.json({
      error: err.message
    });
  }
};

exports.addData = async (req, res) => {
  try {
    let data = req.body;
    console.log("\n New Event : Data to be uploaded : \n");
    console.log(data);
      let uploadedData = await Sensor.create(data);
    res.status(201).json({
        data: uploadedData
    });
  } catch (err) {
    res.json({
      error: err.message
    });
  }
};

exports.deleteData = async (req, res) => {
    try {
      await Sensor.deleteMany(); // Delete all documents in the "Sensor" collection
      res.status(200).json({
        message: "All data deleted successfully."
      });
    } catch (err) {
      res.json({
        error: err.message
      });
    }
  };
  