const express = require('express');
const path = require('path');

const port = 5000;
const app = express();

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Set up EJS as view engine
app.set('view engine', 'ejs');

// Set up public folder (for images, stylesheets and client-side javascript)
app.use(express.static(path.join(__dirname, 'public')));

// Find routes file
const routes = require('./server/routes/users.js');
// Mount routes to the main endpoint '/'
app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
    //console.log('Listening on port ' + port + '.');
});