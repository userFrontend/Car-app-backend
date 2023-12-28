const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const CategoryCtrl = require('../contoller/categoryCtrl');


router.post('/', authMiddleware, CategoryCtrl.add);
router.get('/', CategoryCtrl.get);
router.get('/:id', CategoryCtrl.getOne);
router.delete('/:categoryId', authMiddleware, CategoryCtrl.deleteChat);

module.exports = router