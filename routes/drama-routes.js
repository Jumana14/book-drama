const express = require('express');

const {insertOneDrama, getAllDramas, insertManyDrama, getDramaById, updateDramaUsingPut, updateById, deleteById} = require('../controllers/drama-controllers');

const router = express.Router();

//to get all the drama list 
router.get('/',getAllDramas);
// to create one drama
router.post('/one',insertOneDrama);
//to create many drama
router.post('/many',insertManyDrama);
//to get particular drama using id
router.get('/:id',getDramaById);
//to update particular drama using id
router.put('/:id',updateById);
//to delete particular drama using id
router.delete('/:id',deleteById);

router.put('/:id',updateDramaUsingPut)

module.exports(router);