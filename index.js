
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sunit',
    password: 'sunit',
    database: 'mynode'
});

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
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

app.post('/reg', (req, res) => {

    const { name, email, password } = req.body;
    console.log(name, email, password);

    let checkQuery = "SELECT id FROM users WHERE name = ? OR email = ?";
    db.query(checkQuery, [name, email], (err, res) => {
        if (err) {
            console.log("line 39", err);
            return;
        }

        if (res.length <= 0) {
            let insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(insertQuery, [name, email, password], (err, res) => {
                if (err) {
                    console.log("error: line 45 ", err);
                    return;
                }
            });
        } else {
            console.log('User not added');
        }
    });


    res.status(201).send('user added')

})



// app.get('/createUserTable', (req,res)=>{
//     let sql='CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255),PRIMARY KEY(id))';
//     db.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send('blog tsble created')
//     })
// })
// app.get('/createBlogTable', (req,res)=>{
//     let sql='CREATE TABLE blogs(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255),PRIMARY KEY(id))';
//     db.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send('blog tsble created')
//     })
// })