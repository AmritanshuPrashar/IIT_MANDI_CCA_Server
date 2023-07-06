const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const sensorModel = require('../models/sensorModel');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');

async function sendSensorDataAsCSV(data, email) {
  try {
    const csvWriter = createObjectCsvWriter({
      path: 'data.csv',
      header: [
        { id: 'timestamp', title: 'Timestamp' },
        { id: 'temperature.internal.Sensor1', title: 'Internal Temperature Sensor 1' },
        { id: 'temperature.internal.Sensor2', title: 'Internal Temperature Sensor 2' },
        { id: 'temperature.internal.Sensor3', title: 'Internal Temperature Sensor 3' },
        { id: 'temperature.internal.Sensor4', title: 'Internal Temperature Sensor 4' },
        { id: 'temperature.internal.Sensor5', title: 'Internal Temperature Sensor 5' },
        { id: 'temperature.internal.Sensor6', title: 'Internal Temperature Sensor 6' },
        { id: 'temperature.internal.Sensor7', title: 'Internal Temperature Sensor 7' },
        { id: 'temperature.internal.Sensor8', title: 'Internal Temperature Sensor 8' },
        { id: 'temperature.external.Sensor1', title: 'External Temperature Sensor 1' },
        { id: 'temperature.external.Sensor2', title: 'External Temperature Sensor 2' },
        { id: 'temperature.external.Sensor3', title: 'External Temperature Sensor 3' },
        { id: 'temperature.external.Sensor4', title: 'External Temperature Sensor 4' },
        { id: 'temperature.external.Sensor5', title: 'External Temperature Sensor 5' },
        { id: 'temperature.external.Sensor6', title: 'External Temperature Sensor 6' },
        { id: 'temperature.external.Sensor7', title: 'External Temperature Sensor 7' },
        { id: 'temperature.external.Sensor8', title: 'External Temperature Sensor 8' },
        { id: 'humidity.inside.Sensor1', title: 'Internal Humidity Sensor 1' },
        { id: 'humidity.inside.Sensor2', title: 'Internal Humidity Sensor 2' },
        { id: 'humidity.inside.Sensor3', title: 'Internal Humidity Sensor 3' },
        { id: 'humidity.inside.Sensor4', title: 'Internal Humidity Sensor 4' },
        { id: 'humidity.inside.Sensor5', title: 'Internal Humidity Sensor 5' },
        { id: 'humidity.inside.Sensor6', title: 'Internal Humidity Sensor 6' },
        { id: 'humidity.inside.Sensor7', title: 'Internal Humidity Sensor 7' },
        { id: 'humidity.inside.Sensor8', title: 'Internal Humidity Sensor 8' },
        { id: 'humidity.outside.Sensor1', title: 'External Humidity Sensor 1' },
        { id: 'humidity.outside.Sensor2', title: 'External Humidity Sensor 2' },
        { id: 'humidity.outside.Sensor3', title: 'External Humidity Sensor 3' },
        { id: 'humidity.outside.Sensor4', title: 'External Humidity Sensor 4' },
        { id: 'humidity.outside.Sensor5', title: 'External Humidity Sensor 5' },
        { id: 'humidity.outside.Sensor6', title: 'External Humidity Sensor 6' },
        { id: 'humidity.outside.Sensor7', title: 'External Humidity Sensor 7' },
        { id: 'humidity.outside.Sensor8', title: 'External Humidity Sensor 8' },
        { id: 'soilTemperature.inside.Sensor1', title: 'Internal Soil Temperature Sensor 1' },
        { id: 'soilTemperature.inside.Sensor2', title: 'Internal Soil Temperature Sensor 2' },
        { id: 'soilTemperature.inside.Sensor3', title: 'Internal Soil Temperature Sensor 3' },
        { id: 'soilTemperature.inside.Sensor4', title: 'Internal Soil Temperature Sensor 4' },
        { id: 'soilTemperature.inside.Sensor5', title: 'Internal Soil Temperature Sensor 5' },
        { id: 'soilTemperature.inside.Sensor6', title: 'Internal Soil Temperature Sensor 6' },
        { id: 'soilTemperature.inside.Sensor7', title: 'Internal Soil Temperature Sensor 7' },
        { id: 'soilTemperature.inside.Sensor8', title: 'Internal Soil Temperature Sensor 8' },
        { id: 'pyranometer.Sensor1', title: 'Pyranometer Sensor 1' },
        { id: 'waterTemperature.Sensor1', title: 'Water Temperature Sensor 1' },
        { id: 'waterTemperature.Sensor2', title: 'Water Temperature Sensor 2' },
        { id: 'co2.Sensor1', title: 'CO2 Sensor 1' },
        { id: 'co2.Sensor2', title: 'CO2 Sensor 2' },
        { id: 'light.Sensor1', title: 'Light Sensor 1' },
        { id: 'light.Sensor2', title: 'Light Sensor 2' },
        { id: 'moisture.Sensor1', title: 'Moisture Sensor 1' },
        { id: 'moisture.Sensor2', title: 'Moisture Sensor 2' },
        { id: 'moisture.Sensor3', title: 'Moisture Sensor 3' },
        { id: 'moisture.Sensor4', title: 'Moisture Sensor 4' },
        { id: 'actuators.Sensor1', title: 'Actuator Sensor 1' },
        { id: 'actuators.Sensor2', title: 'Actuator Sensor 2' },
        { id: 'actuators.Sensor3', title: 'Actuator Sensor 3' },
        { id: 'actuators.Sensor4', title: 'Actuator Sensor 4' },
        { id: 'actuators.Sensor5', title: 'Actuator Sensor 5' },
        { id: 'actuators.Sensor6', title: 'Actuator Sensor 6' },
      ],
    });

    const csvData = data.map(item => ({
      timestamp: item.timestamp,
      'temperature.internal.Sensor1': item.data.temperature.internal.Sensor1,
      'temperature.internal.Sensor2': item.data.temperature.internal.Sensor2,
      'temperature.internal.Sensor3': item.data.temperature.internal.Sensor3,
      'temperature.internal.Sensor4': item.data.temperature.internal.Sensor4,
      'temperature.internal.Sensor5': item.data.temperature.internal.Sensor5,
      'temperature.internal.Sensor6': item.data.temperature.internal.Sensor6,
      'temperature.internal.Sensor7': item.data.temperature.internal.Sensor7,
      'temperature.internal.Sensor8': item.data.temperature.internal.Sensor8,
      'temperature.external.Sensor1': item.data.temperature.external.Sensor1,
      'temperature.external.Sensor2': item.data.temperature.external.Sensor2,
      'temperature.external.Sensor3': item.data.temperature.external.Sensor3,
      'temperature.external.Sensor4': item.data.temperature.external.Sensor4,
      'temperature.external.Sensor5': item.data.temperature.external.Sensor5,
      'temperature.external.Sensor6': item.data.temperature.external.Sensor6,
      'temperature.external.Sensor7': item.data.temperature.external.Sensor7,
      'temperature.external.Sensor8': item.data.temperature.external.Sensor8,
      'humidity.inside.Sensor1': item.data.humidity.inside.Sensor1,
      'humidity.inside.Sensor2': item.data.humidity.inside.Sensor2,
      'humidity.inside.Sensor3': item.data.humidity.inside.Sensor3,
      'humidity.inside.Sensor4': item.data.humidity.inside.Sensor4,
      'humidity.inside.Sensor5': item.data.humidity.inside.Sensor5,
      'humidity.inside.Sensor6': item.data.humidity.inside.Sensor6,
      'humidity.inside.Sensor7': item.data.humidity.inside.Sensor7,
      'humidity.inside.Sensor8': item.data.humidity.inside.Sensor8,
      'humidity.outside.Sensor1': item.data.humidity.outside.Sensor1,
      'humidity.outside.Sensor2': item.data.humidity.outside.Sensor2,
      'humidity.outside.Sensor3': item.data.humidity.outside.Sensor3,
      'humidity.outside.Sensor4': item.data.humidity.outside.Sensor4,
      'humidity.outside.Sensor5': item.data.humidity.outside.Sensor5,
      'humidity.outside.Sensor6': item.data.humidity.outside.Sensor6,
      'humidity.outside.Sensor7': item.data.humidity.outside.Sensor7,
      'humidity.outside.Sensor8': item.data.humidity.outside.Sensor8,
      'soilTemperature.inside.Sensor1': item.data.soilTemperature.inside.Sensor1,
      'soilTemperature.inside.Sensor2': item.data.soilTemperature.inside.Sensor2,
      'soilTemperature.inside.Sensor3': item.data.soilTemperature.inside.Sensor3,
      'soilTemperature.inside.Sensor4': item.data.soilTemperature.inside.Sensor4,
      'soilTemperature.inside.Sensor5': item.data.soilTemperature.inside.Sensor5,
      'soilTemperature.inside.Sensor6': item.data.soilTemperature.inside.Sensor6,
      'soilTemperature.inside.Sensor7': item.data.soilTemperature.inside.Sensor7,
      'soilTemperature.inside.Sensor8': item.data.soilTemperature.inside.Sensor8,
      'pyranometer.Sensor1': item.data.pyranometer.Sensor1,
      'waterTemperature.Sensor1': item.data.waterTemperature.Sensor1,
      'waterTemperature.Sensor2': item.data.waterTemperature.Sensor2,
      'co2.Sensor1': item.data.co2.Sensor1,
      'co2.Sensor2': item.data.co2.Sensor2,
      'light.Sensor1': item.data.light.Sensor1,
      'light.Sensor2': item.data.light.Sensor2,
      'moisture.Sensor1': item.data.moisture.Sensor1,
      'moisture.Sensor2':item.data.moisture.Sensor2,
      'moisture.Sensor3': item.data.moisture.Sensor3,
      'moisture.Sensor4': item.data.moisture.Sensor4,
      'actuators.Sensor1': item.data.actuators.Sensor1,
      'actuators.Sensor2': item.data.actuators.Sensor2,
      'actuators.Sensor3': item.data.actuators.Sensor3,
      'actuators.Sensor4': item.data.actuators.Sensor4,
      'actuators.Sensor5': item.data.actuators.Sensor5,
      'actuators.Sensor6': item.data.actuators.Sensor6,
    }));

    // Write CSV data
    await csvWriter.writeRecords(csvData);

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'iitmandiccafacility@gmail.com',
        pass: 'phfwgzkimurnatre',
      },
    });

    const mailOptions = {
      from: 'sender@example.com',
      to: email,
      subject: 'Sensor Data CSV',
      text: 'Please find the attached CSV file with the sensor data.',
      html: '<p>Please find the attached CSV file with the sensor data.</p>',
      attachments: [
        {
          filename: 'data.csv',
          path: 'data.csv',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    fs.unlinkSync('data.csv');
  } catch (error) {
    console.error('Failed to convert data to CSV and send email:', error);
    throw new Error('An error occurred while converting data to CSV and sending the email.');
  }
}

async function downloadData(req, res) {
  try {
    const id = req.body.id;
    const user = await userModel.findById(id);
    console.log(user.email);
    const email = user.email;

    const data = await sensorModel.find({}).exec();

    await sendSensorDataAsCSV(data, email);
    console.log('Email sent successfully.');
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
}

module.exports = downloadData;
