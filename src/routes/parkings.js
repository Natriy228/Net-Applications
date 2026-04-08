const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

// Определение маршрутов
router.get('/', parkingController.getAllParkings);
router.get('/:id', parkingController.getParkingById);
router.post('/', parkingController.createParking);
router.patch('/:id', parkingController.updateParking);
router.delete('/:id', parkingController.deleteParking);

module.exports = router;