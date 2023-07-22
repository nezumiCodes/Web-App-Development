const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../config/database');

exports.login_page = (req, res) => {
    res.render('login');
};

exports.register_page = (req, res) => {
    res.render('register');
};

exports.register = (req, res) => {
    const {username, email, password} = req.body;

    db.get(`SELECT id FROM creds WHERE email = ?`, [email], (err, emailExists) => {
        if(err) { return res.status(500).render('500') }

        if(emailExists) { return res.status(409).json({error: 'Email already exists.'}) }

        db.get(`SELECT id FROM creds WHERE username = ?`, [username], (err, userExists) => {
            if(err) { return res.status(500).render('500') }

            if(userExists) { return res.status(409).json({error: 'Username already taken.'}) }

            const hashPass = bcrypt.hashSync(password, 10);

            db.run(`INSERT INTO creds (username, email, password) VALUES (?,?,?)`,
                    [username, email, hashPass], 
                    (err) => {
                        if(err) {
                            console.error(err);
                            return res.status(500).render('500');
                        }
                        res.status(200).json({message: "Successfully registered user."});
            });
        });
    });
};