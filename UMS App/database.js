const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const db = new sqlite3.Database('./user.sqlite', (err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    console.log('Connected to the database successfully');
});


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(100), 
        email VARCHAR(100), 
        password VARCHAR(100)
    )`, (err) => {
        if(err) {
            console.log(err);
            throw err;
        }
        console.log('Table created successfully');
        let insert = `INSERT INTO user (name, email, password) VALUES (?,?,?)`;
        db.run(insert, ['admin','admin@test.com',md5('admin12345')]);
        db.run(insert, ['user','user@test.com',md5('user12345')]);
    });
});

module.exports = db;