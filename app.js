const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 7000;
const db = require('./db');
const {router: bookRouter} = require('./routes/book-routes');
const {router: dramaRouter} = require('./routes/book-routes');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/books', bookRouter);
app.use('/api/drama', dramaRouter)

// db.connectToServer(()=>{
//     app.listen(port,()=>{
//         console.log('Server is listening on port ',port);
//     })
// })

app.listen(port,()=>{
        console.log('Server is listening on port ',port);
})