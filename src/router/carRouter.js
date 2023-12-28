const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const carCtrl = require('../contoller/carCtrl');


router.post('/', authMiddleware, carCtrl.add);
router.get('/', carCtrl.get);
router.get('/:id', carCtrl.getOne);
router.delete('/:carId', authMiddleware, carCtrl.deleteChat);

module.exports = router