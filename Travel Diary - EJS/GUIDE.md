# Creating a Node web application

### Setting up the project's server
- Create a new project: `npm -y init`
- Create the main file (entry point of application) for our backend f.e. `app.js`
- Modify the `main` property in `package.json` to be the same as my main file f.e. `index.js` --> `app.js`
- Install `nodemon`: `npm install nodemon` OR `npm install --save-dev nodemon`
- In `package.json` create a new `start` script --> `"start" : "nodemon <main_file.js>"`
- (Optional) Create a `.gitignore` file in the root of the project
- (Optional) In `.gitignore` add:
  - `node_modules/`
  - `package-lock.json`
  - `.env`

<hr>

### Creating the application's server structure
- In the root folder create the following folders:
  - `server` --> folders `controllers` and `routes`
  - `middleware` : for custom middleware
  - `config` : for the database and `.env` files
- If using `EJS` for rendering pages, create also the following folders in the root:
  - `views` --> folder `partials` if creating partial `HTML`
  - `public` --> folders `images`, `scripts` (for frontend JS), `styles` 