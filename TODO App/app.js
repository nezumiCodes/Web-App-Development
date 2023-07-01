const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database.js');

let port = 3000 || 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({Page: 'Main page'});
});

// Return everything from the todo table
app.get('/todos', (req, res) => {
    db.all(`SELECT * FROM todo`, (err, rows) => {
        if(err) return res.status(500).json({err: err.message});
        res.json(rows);
    });
});

// Add a new entry to our todo table
app.post('/todos', (req, res) => {
    const {task} = req.body; 
    console.log(req.body);
    if(!task) return res.status(400).json({error: 'Task not specified.'});

    db.run(`INSERT INTO todo (task) VALUES (?)`, [task], function(err) {
        if(err) return res.status(500).json({err: err.message});

        res.json({id: this.lastID, task: task, completed: false});
    });
});

// Identify an entry by its id and update it entry within the todo table
// https://localhost:3000/todos/2 -> 2 is the id parameter
app.put('/todos/:id', function(req, res) {
    const {id} = req.params;
    db.run(`UPDATE todo SET completed = 1 WHERE id = ?`, [id], (err) => {
        if(err) return res.status(500).json({err: err.message});

        if(this.changes === 0) return res.status(404).json({err: 'Task not found.'});
        
        res.json({ message: 'Todo marked as completed.'});
    });
});

// Identify an entry by its id and delete it from the todo table
app.delete('/todos/:id', function(req, res){
    const {id} = req.params;
    db.run(`DELETE FROM todo WHERE id = ?`, [id], (err) => {
        if(err) return res.status(500).json({err: err.message});

        if(this.changes === 0) return res.status(404).json({err: 'Task not found.'});

        res.json({ message: 'Todo successfully deleted.'});
    });
});

app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
});