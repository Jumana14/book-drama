const {MongoClient, CURSOR_FLAGS} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName ='learning';
let _db;
const connectToServer = (callback)=> {
    MongoClient.connect(url)
    .then(client=>{
        _db = client.db(dbName);
        console.log('Database Connected Successfully');
        callback()
    })
    .catch(err=>{
        console.log('Database Connection Failed: ',err);
    });
};

const getDb = ()=> _db
module.exports = {connectToServer, getDb}