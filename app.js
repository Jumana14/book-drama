const express = require('express');
const http = require('http')
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

//how to push code from your branch to main branch
/*
made changes in my branch and push in main branch
1. git add .
2. git commit -m ""
3. git switch main
4. git pull origin main
5. git merge branch_name
*/