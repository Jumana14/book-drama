const express =  require('express');

const router = express.Router();

const {createOneBook, createManyBooks, getAllBooks, getBookById, deleteById, updateById} = require('../controllers/book-controllers');
 
router.post('/one', createOneBook);
router.post('/many', createManyBooks);
router.get('/',getAllBooks);
router.get('/:id', getBookById);
router.delete('/:id',deleteById);
router.put('/:id',updateById);

module.exports = {router}