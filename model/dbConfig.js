const mysql=require('mysql')

const db = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6636326',
    password: 'qE6yjwME7r',
    database: 'mynode'
});


module.exports= db;