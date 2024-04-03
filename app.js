// Importing required modules
const express = require('express');
const path = require('path');

// Creating an Express application
const app = express();

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// Define a route handler for the root path
app.get('/', (req, res) => {
  // Render the index.ejs file and pass a variable to it
  res.render('index', { name: 'John' });
});

// Define a route handler for handling 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Starting the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
