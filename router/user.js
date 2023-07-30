const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
require('dotenv').config();

const db=require('../model/dbConfig')
const secretKey = process.env.JWT_SECRET;
router.post('/', (req, resp) => {

    const { email, password } = req.body;

    let query = `SELECT id, name, email, password FROM users where email= ?`
    db.query(query, [email], (err, res) => {
        // console.log(res)
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length<=0) {
            return resp.status(409).json({
                status: "Failed",
                message: "There is no acccount with this mail",
            });
        }
        else {
            const txt = res[0].password;
            if (txt == password) {
                const token = jwt.sign({ id: res[0].id }, secretKey);
                resp.status(200).json({
                    status: "success",
                    token,
                });
            }
        }
    });
});

router.post('/reg', (req, res) => {

    const { name, email, password } = req.body;
    // console.log(name, email, password);

    let checkQuery = "SELECT id FROM users WHERE name = ? OR email = ?";
    db.query(checkQuery, [name, email], (err, res) => {
        if (err) {
            console.log("line 39", err);
            return;
        }
        let insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [name, email, password], (err, res) => {
            if (err) {
                console.log("error: line 45 ", err);
                return;
            }
        });

    });
    res.status(201).send('user added')
});




module.exports = router;