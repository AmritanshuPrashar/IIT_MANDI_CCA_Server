const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const sensorModel = require('../models/sensorModel');
const csv = require('csv-parser');
const fs = require('fs');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iitmandiccafacility@gmail.com',
    pass: 'phfwgzkimurnatre',
  },
});

async function downloadData(req, res) {
  try {
    // Retrieve data from MongoDB
    const data = await sensorModel.find({});

    // Convert data to CSV format
    const csvData = [];
    for (const item of data) {
      csvData.push({
        timestamp: item.timestamp,
        ...item.data.temperature.internal,
        ...item.data.temperature.external,
        ...item.data.humidity.internal,
        ...item.data.humidity.external,
      });
    }

    // Create a CSV file
    const csvFilePath = 'data.csv';
    fs.writeFileSync(csvFilePath, '');

    fs.appendFileSync(csvFilePath, `${Object.keys(csvData[0]).join(',')}\n`);
    for (const row of csvData) {
      fs.appendFileSync(csvFilePath, `${Object.values(row).join(',')}\n`);
    }

    // Get the user's email
    const id = req.body.id;
    const user = await userModel.findById(id);
    console.log(user.email);
    const email = user.email;

    const mailOptions = {
      from: 'sender@example.com', // sender address
      to: email, // recipient address(es), separated by commas for multiple recipients
      subject: 'CCA - IITMandi', // subject line
      text: 'Please find the attached CSV file with the sensor data.', // plain text body
      attachments: [
        {
          filename: 'data.csv',
          path: csvFilePath,
        },
      ],
    };

    // Send email using the configured transporter
    transporter.sendMail(mailOptions, (error, info) => {
      // Delete the CSV file after sending the email
      fs.unlinkSync(csvFilePath);

      if (error) {
        console.log('Error occurred while sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email.' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully.' });
      }
    });
  } catch (error) {
    console.error('Failed to download data and send email:', error);
    res.status(500).json({ error: 'An error occurred while downloading data and sending the email.' });
  }
}

module.exports = downloadData;
