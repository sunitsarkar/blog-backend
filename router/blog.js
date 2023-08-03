const express=require('express');
const router=express.Router();
const db=require('../model/dbConfig');
const auth=require('../middelware/auth')


router.post('/create',auth, (req, res) => {

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

router.get('/get', auth,(req, res) => {
    const email=req.query.email

    let query = `SELECT id, email, blog FROM blogs WHERE email = ?`;
    db.query(query, [email], (err, result) => {
        if (err) {
            console.log("error: ", err);
            return res.status(500).json({
                status: "Failed",
                message: "Error occurred while fetching data from the database.",
            });
        }
        res.status(200).json(result);
    });
});

router.delete('/delete', (req, res) => {
    const id=req.query.id;

    let query = `DELETE FROM blogs WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log("error: ", err);
            return res.status(500).json({
                status: "Failed",
                message: "Error occurred while deleting data from the database.",
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "No blog found with the provided email.",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Blog deleted successfully.",
        });
    });
});





module.exports=router;