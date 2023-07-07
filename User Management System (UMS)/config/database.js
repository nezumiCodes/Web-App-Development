const sqlite3 = require('sqlite3').verbose();

// connect to database
const db = new sqlite3.Database('./ums.db');

const initialData = [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@gmail.com',
      phone: '1234567890',
      position: 'Manager',
      department: 'HR'
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@gmail.com',
      phone: '0987654321',
      position: 'Software Engineer',
      department: 'IT'
    },
    {
      first_name: 'Mike',
      last_name: 'Johnson',
      email: 'mike.johnson@gmail.com',
      phone: '5555555555',
      position: 'Analyst',
      department: 'Finance'
    }
  ];

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
                user_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
    `);

    db.get(`SELECT COUNT(*) AS count FROM users`, (err, row) => {
        if(err) {return console.error(err);}

        const rowCount = row.count;
        if(rowCount === 0){
            initialData.forEach((data) => {
                db.run(
                  'INSERT INTO users (first_name, last_name, email, phone, position, department) VALUES (?, ?, ?, ?, ?, ?)',
                  [data.first_name, data.last_name, data.email, data.phone, data.position, data.department],
                  (err) => {
                    if (err) { return console.error(err); }
                    console.log('Row was inserted successfully.');
                });
            });
        }
    });
        

})
    
// Export the connection object
module.exports = db;