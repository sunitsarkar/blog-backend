const mysql=require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sunit',
    password: 'sunit',
    database: 'mynode'
});


module.exports= db;