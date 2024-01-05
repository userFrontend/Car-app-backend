const express = require('express');
const router = express.Router();
const banCtrl = require('../contoller/banCtrl');
const authMiddleware = require('../middleware/authmiddleware');


router.post('/:userId', authMiddleware, banCtrl.add);
router.get('/', authMiddleware, banCtrl.get);
router.delete('/:userId', authMiddleware, banCtrl.deleteBaned);

module.exports = router