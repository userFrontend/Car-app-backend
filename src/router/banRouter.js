const express = require('express');
const router = express.Router();
const banCtrl = require('../contoller/banCtrl');
const authMiddleware = require('../middleware/authmiddleware');


router.post('/ban', authMiddleware, banCtrl.add);
router.delete('/ban/:id', authMiddleware, banCtrl.deleteBaned);

module.exports = router