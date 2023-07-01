const sqlite3 = require('sqlite3').verbose();

// Change here from todo.db to todo.sqlite
const db = new sqlite3.Database('./todo.sqlite', (err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    console.log('Connected to the database successfully');
});

/*
    Use the .serialize() function to ensure that the creation of the table finishes
    before proceeding to anything else. This will ensure that the table is created 
    and we fall to no errors of untimely queries.

    On the other hand, the .run() function initiates the query and returns immediately, 
    letting the query run in the background. This can create issues if we are doing major
    changes that will affect our next queries.
*/
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL, 
        completed boolean NOT NULL DEFAULT 0
    )`, (err) => {
        if(err) {
            console.log(err);
            throw err;
        }
        console.log('Table created successfully');
        db.run(`INSERT INTO todo (task) VALUES (?)`, ['test 1']);
        db.run(`INSERT INTO todo (task) VALUES (?)`, ['test 2']);
    });
});

module.exports = db;