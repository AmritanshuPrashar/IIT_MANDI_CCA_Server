const express = require('express');
const { getData, addData, deleteData, filterDataByTimeRange } = require('../controllers/sensorController');
const router = express.Router();

router.get('/data', getData);
router.post('/addData', addData);
router.delete('/delData', deleteData);
router.get('/filter', filterDataByTimeRange);
module.exports = router;
