const sqlite3 = require('sqlite3').verbose();

// connect to database
const db = new sqlite3.Database('./ums.db');

// Use serialize function to ensure that the table(s) are created
// and initialized before doing any other requests.
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name VARCHAR(255) NOT NULL, 
            last_name VARCHAR(255) NOT NULL, 
            email VARCHAR(255) NOT NULL, 
            phone VARCHAR(255) NOT NULL, 
            comments TEXT, 
            status VARCHAR(10) NOT NULL DEFAULT 'active',
            position VARCHAR(255) NOT NULL,
            department VARCHAR(255) NOT NULL
        )
    `);

    db.run(`
            CREATE TABLE IF NOT EXISTS creds (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                admin BOOLEAN DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
    `);
});

// Export the connection object
module.exports = db;