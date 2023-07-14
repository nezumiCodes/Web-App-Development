const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.view_all); // View all users data (admin view)
router.post('/', usersController.search_user); // Search for a specific user

// For all pages we need to have a GET route that will render the page itself

// Render the 'add user' page
router.get('/add_user', usersController.add_page);
// Route to handle the form submission for a new user
router.post('/add_user', usersController.add_user);
// Render the 'edit user' page
router.get('/edit_user/:id', usersController.edit_page);
// Route to handle the data update for a user
router.put('/edit_user/:id', usersController.edit_user);
// Route to handle the removal of a user from the UMS
// We will NOT create a GET method to render the page, rather we will be rendering a button for 
// each user in the frontend and call the delete endpoint when the button is clicked
router.get('/delete_user/:id', usersController.delete_user);

module.exports = router;