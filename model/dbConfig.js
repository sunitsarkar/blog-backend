const mysql=require('mysql')

const db = mysql.createConnection({
    host: 'bzexmgoffknfacl4uhwo-mysql.services.clever-cloud.com',
    user: 'ucacpkmvngscdk4z',
    password: '5dCReicAyEnLVynXKtSj',
    database: 'bzexmgoffknfacl4uhwo'
});


module.exports= db;