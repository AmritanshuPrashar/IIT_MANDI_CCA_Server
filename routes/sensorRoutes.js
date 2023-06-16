const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/data', sensorController.getData);
router.post('/addData', sensorController.addData);
router.delete('/delData', sensorController.deleteData);
module.exports = router;
