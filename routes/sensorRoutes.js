const express = require('express');
const { getData, addData, deleteData, filterDataByTimeRange, updateSensorData } = require('../controllers/sensorController');
const { checkDataAccess } = require('../controllers/userController');
const router = express.Router();

router.get('/:plantId/data', getData); // Route with the plant ID parameter
router.post('/:plantId/addData', addData); // Route with the plant ID parameter
router.delete('/:plantId/delData', deleteData); // Route with the plant ID parameter
router.get('/:plantId/filter', filterDataByTimeRange); // Route with the plant ID parameter
// Add this route to the existing sensorRoutes.js file
router.post('/:plantId/updateData', updateSensorData);

module.exports = router;
