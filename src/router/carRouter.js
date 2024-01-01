const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const carCtrl = require('../contoller/carCtrl');


router.post('/', authMiddleware, carCtrl.add);
router.get('/', carCtrl.get);
router.get('/:id', carCtrl.getOne);
router.put('/:carId', authMiddleware, carCtrl.updateCar);
router.delete('/:carId', authMiddleware, carCtrl.deleteCar);

module.exports = router