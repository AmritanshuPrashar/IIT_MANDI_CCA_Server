const express = require('express');
const { getData, addData, deleteData, filterDataByTimeRange, updateSensorData } = require('../controllers/sensorController');
const { checkDataAccess } = require('../controllers/userController');
const router = express.Router();


router.use(checkDataAccess);
router.get('/:plantId/data', getData); 
router.post('/:plantId/addData', addData); 
router.delete('/:plantId/delData', deleteData); 
router.get('/:plantId/filter', filterDataByTimeRange); 
router.post('/:plantId/updateData', updateSensorData);

module.exports = router;
