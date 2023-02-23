const express = require('express');
const md5 = require('md5');
const bodyParser = require('body-parser');
const db = require('./database.js');

let port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({"message" : "Root path"});
});

app.get('/api/user', (req, res, next) => {
    let users = `SELECT * FROM user`;
    let params = [];
    db.all(users, params, (err, result) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message" : "success",
            "data" : result
        });
    });
});

app.get('/api/user/:id', (req, res, next) => {
    let users = `SELECT * FROM user WHERE id = ?`;
    let params = [req.params.id];
    db.get(users, params, (err, result) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message" : "success",
            "data" : result
        });
    });
});

app.post('/api/user', (req,res,next) => {
    let errors = [];
    if(!req.body.name) errors.push('No name');
    if(!req.body.password) errors.push('No password');
    if(!req.body.email) errors.push('No email');
    if(errors.length) {
        res.status(400).json({"errors": errors.join(", ")});
        return;
    }
    let query = `INSERT INTO user (name, email, password) VALUES (?,?,?)`;
    let data = {
        name: req.body.name, 
        email: req.body.email, 
        password: md5(req.body.password), 
    };
    let params = [data.name, data.email, data.password];
    db.run(query, params, (err, result) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message" : "success",
            "data" : data
        });
    });
});

app.delete('/api/user/:id', (req, res, next) => {
    let query = `DELETE FROM user WHERE id = ?`
    let params = [req.params.id];
    db.run(query, params, (err, result) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message" : "deleted",
            "rows" : this.changes
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
