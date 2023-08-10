const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController'); // relative path to the controller file

// Generate the main page with the map
router.get('/', mapController.main_page);
// // Create a new marker on the map
// router.post('/', mapController.new_marker);
// // Edit a marker's information
// router.put('/edit/:id', mapController.edit_marker);
// // Delete a marker
// router.delete('/delete/:id', mapController.delete_marker);

module.exports = router;