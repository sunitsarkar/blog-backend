const express=require('express');
const router=express.Router();
const db=require('../model/dbConfig')


router.post('/create', (req, res) => {

    const { email, blog } = req.body;

    let insertQuery = "INSERT INTO blogs (email, blog) VALUES (?, ?)";
    db.query(insertQuery, [email, blog], (err, result) => {
        if (err) {
            console.log("error: line 45 ", err);
            return;
        }
        if(!result){
            res.send('error while creating blog')
        }
    });
    res.status(201).send('blog created')
});



module.exports=router;