const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter=require('./router/user');
const blogRouter=require('./router/blog')
const db=require('./model/dbConfig')

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

  
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("mysql connected..")
})
app.listen(8000, () => {
    console.log('server is live on port 8000..')
})

app.use('/', userRouter)
app.use('/blog',blogRouter)

// app.get('/createUserTable', (req,res)=>{
//     let sql='CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255),PRIMARY KEY(id))';
//     db.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send('blog tsble created')
//     })
// })
// app.get('/createBlogTable', (req,res)=>{
//     let sql='CREATE TABLE blogs(id int AUTO_INCREMENT, email VARCHAR(255), blog VARCHAR(255), PRIMARY KEY(id))';
//     db.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send('blog tsble created')
//     })
// })

