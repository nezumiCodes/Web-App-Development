exports.main_page = (req, res) => {
    try {
        res.render('main'); // Render the `main.ejs` page
    } catch(err) {
        console.error(err);
        res.render('500'); // Render the `500.ejs` page
    }
};

// exports.new_marker = (req, res) => {
//     try {

//     } catch(err) {
//         console.error(err);
//         res.render('500'); // Render the `500.ejs` page
//     }
// };

// exports.edit_marker = (req, res) => {
//     try {

//     } catch(err) {
//         console.error(err);
//         res.render('500'); // Render the `500.ejs` page
//     }
// };

// exports.delete_marker = (req, res) => {
//     try {

//     } catch(err) {
//         console.error(err);
//         res.render('500'); // Render the `500.ejs` page
//     }
// };