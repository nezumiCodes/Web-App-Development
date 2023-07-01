const express = require('express');
const fileup = require('express-fileupload');
const db = require('./config/database'); // require the database connection file (.js)

const app = express();
const port = 5000;

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// File upload Middleware
app.use(fileup());

// Mount Routes
const todoRoutes = require('./server/routes/todo');
app.use('/', todoRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

