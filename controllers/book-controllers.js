const {getDb} = require('../db');
const {ObjectId} = require('mongodb');
let db = getDb();

const isValidBook = book =>{
    if(!book.title || typeof book.title != 'string') return false;
    if(!book.author || typeof book.author != 'string') return false;
    if(!book.startDate && isNaN (Date.parse(book.startDate))) return false
    return true;
}

const createOneBook = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('books');
        const book = req.body;
        if(!isValidBook(book)){
            return res.status(400).send({success: false, message: 'Invalid Book data'});
        }
        const createOne = await collection.insertOne(book);
        res.status(200).send({success: true, data: createOne})
    } catch(err){
        if(!db){
            res.status(500).send('Database not connected')
        } else {
            res.send({success: false, message: `Error message: ${err}`})
        }
    }
})

const createManyBooks = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('books');
        const book = req.body.map( books =>({
            ...books
        }))
        if(!isValidBook(book)){
            return res.status(400).send({success: false, message: 'Invalid Book data'});
        }
        const createMany = await collection.insertMany(book);
        res.status(200).send({success: true, data: createMany})
    } catch(err){
        if(!db){
            res.status(500).send('Database not connected')
        } else {
            res.send({success: false, message: `Error message: ${err}`})
        }
    }
})

const getAllBooks = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('books');
        const getBooks = await collection.find({}).toArray();
        res.status(200).send(getBooks)
    } catch(err){
        if(!db){
            res.status(500).send('Database not connected')
        } else {
            res.send({success: false, message: `Error message: ${err}`})
        }
    }
})

const getBookById = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('books');
        const id = req.query.id
        const getOneBook = await collection.findOne({_id: new ObjectId(id)});
        res.status(200).send(getOneBook)
    } catch(err){
        if(!db){
            res.status(500).send('Database not connected')
        } else {
            res.send({success: false, message: `Error message: ${err}`})
        }
    }
})

const deleteById = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('books');
        const {id} = req.params;
        const deleteDocByName = await collection.deleteOne({_id: new ObjectId(id)});
        if (deleteDocByName.deletedCount === 0 ){
            res.status(404).send({success: false, message: `No document fount with this name`})
        } 
        res.status(200).send({success: true, message: `Document deleted ${deleteDocByName}`})
    } catch(err){
        if(!db){
            res.status(500).send('Database not connected')
        } else {
            res.send({success: false, message: `Error message: ${err}`})
        }
    }
})

const updateById = async (req,res)=>{
    try{
        db;
        const collection = db.collection('books');
        const {id} = req.params;
        const updateFields = {};
        if (req.body.title !== undefined) updateFields.title = req.body.title;
        if(req.body.author !== undefined) updateFields.author = req.body.author;
        if(req.body.startDate !== undefined) updateFields.startDate = req.body.startDate;
        if(req,body.endDate !== undefined) updateFields.endDate = req.body.endDate;
        if(Object.keys(updateFields).length === 0) {
            return res.status(400).send({success: false, message: 'No valid fields to update'})
        }
        const result = await collection.updateOne({_id: new ObjectId(id)}, {$set: updateFields});
        if (result.matchedCount === 0){
            return res.status(404).send({success: false, message:'book not found' });            
        }
        res.status(200).send({success: true, message: 'Book updated successfully'})
    } catch(err){
        res.status(500).send({success: false, message: `Error : ${err}`})
    }
};

module.exports = {createOneBook, createManyBooks, getAllBooks, getBookById, deleteById, updateById};