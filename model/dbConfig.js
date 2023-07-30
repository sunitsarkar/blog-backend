const mysql=require('mysql')

const db = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6636326',
    password: '	Please wait',
    database: 'mynode'
});


module.exports= db;