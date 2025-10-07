const {getDb} = require('../db');
const {ObjectId} = require('mongodb');
let db = getDb();

const isValidDrama = drama =>{
    if(!drama.name || typeof drama.name != 'string') return false;
    if(!drama.startDate && isNaN (Date.parse(drama.startDate))) return false
    return true;
}

const insertOneDrama = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('drama');
        const drama = req.body;
        if(!isValidDrama(drama)){
            return res.status(400).send({success: false, message: 'Invalid Drama data'});
        }
        const insertDrama = await collection.insertOne(drama);
        res.status(200).send({success: true, data: insertDrama})
    } catch(err){
        if(!db){
            res.status(500).send('Database not connected')
        } else {
            res.send({success: false, message: `Error message: ${err}`})
        }
    }
})

const insertManyDrama = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('drama');
        const drama = req.body.map( drama =>({
            ...drama
        }))
        if(!isValidDrama(drama)){
            return res.status(400).send({success: false, message: 'Invalid Drama data'});
        }
        const insertDrama = await collection.insertMany(drama);
        res.status(200).send({success: true, data: insertDrama})
    } catch(err){
        if(!db){
            res.status(500).send('Database not connected')
        } else {
            res.send({success: false, message: `Error message: ${err}`})
        }
    }
})

const getAllDramas = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('drama');
        const getDrama = await collection.find({}).toArray();
        res.status(200).send(getDrama)
    } catch(err){
        if(!db){
            res.status(500).send('Database not connected')
        } else {
            res.send({success: false, message: `Error message: ${err}`})
        }
    }
})

const getDramaById = (async (req,res)=>{
    try{
        db;
        const collection  = db.collection('drama');
        const id = req.query.id
        const getOneDrama = await collection.findOne({_id: new ObjectId(id)});
        res.status(200).send(getOneDrama)
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
        const collection  = db.collection('drama');
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
        const collection = db.collection('drama');
        const {id} = req.params;
        const updateFields = {};
        if (req.body.name !== undefined) updateFields.name = req.body.name;
        if(req.body.startDate !== undefined) updateFields.startDate = req.body.startDate;
        if(req,body.endDate !== undefined) updateFields.endDate = req.body.endDate;
        if(Object.keys(updateFields).length === 0) {
            return res.status(400).send({success: false, message: 'No valid fields to update'})
        }
        const result = await collection.updateOne({_id: new ObjectId(id)}, {$set: updateFields});
        if (result.matchedCount === 0){
            return res.status(404).send({success: false, message:'Drama not found' });            
        }
        res.status(200).send({success: true, message: 'Drama updated successfully'})
    } catch(err){
        res.status(500).send({success: false, message: `Error : ${err}`})
    }
};

const updateDramaUsingPut = async (req,res)=>{
    try{
        db;
        const collection = db.collection('drama');
        const {id} = req.params;
        const updateFields = req.body;
        if (!updateFields.endDate || isNaN(Date.parse(updateFields.endDate))){
            return res.status(400).send({success: false, message: 'Valid endate is required to update'})
        }
        if(!isValidDrama(drama)){
            return res.status(400).send({success: false, message:'Invalid drama data'})
        }
        const updateDrama = await collection.updateOne({_id: new ObjectId(id)}, {$set: updateFields});
        if (updateDrama.matchedCount === 0){
            return res.status(404).send({success: false, message:'Drama not found' });            
        }
        res.status(200).send({success: true, message: 'Drama updated successfully'})
    } catch(err){
        res.status(500).send({success: false, message: `Error : ${err}`})
    }
};

module.exports = {insertOneDrama, insertManyDrama, getAllDramas, getDramaById, updateDramaUsingPut, deleteById, updateById};