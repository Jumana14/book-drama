const express = require('express');
const {insertOneDrama, getAllDramas, insertManyDrama, getDramaById, updateDramaUsingPut, updateById, deleteById} = require('../controllers/drama-controllers');
const router = express.Router();

router.get('/',getAllDramas);
router.post('/one',insertOneDrama);
router.post('/many',insertManyDrama);
router.get('/:id',getDramaById);
router.put('/:id',updateById);
router.delete('/:id',deleteById);
router.put('/:id',updateDramaUsingPut)

module.exports(router);