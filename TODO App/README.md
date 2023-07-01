## Simple TODO App using Node.js, Express and sqlite3

Clone the repository to a local project.
Localhost runs on port `3000` by default.
`Nodemon` is available, run the project with `npm start`.

- `database.js` establishes the connection to the database, and creates the `todo` table, if not available.
- `app.js` handles GET, POST, PUT and DELETE requests. Send json responses to the client.
- `public/index.html` will have a form to add todo tasks, edit them and delete.
  