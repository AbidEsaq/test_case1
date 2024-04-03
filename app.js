const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abid@405',
  database: 'etb_hrms_schema'
});

// Set view engine
app.set('view engine', 'ejs');

// Connect to MySQL
connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// Route to display HTML Form
app.get('/', (req, res) => {
  const query = 'SELECT * FROM employees';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.render('index', { employees: results }); // Render the index.ejs with employee data
  });
});

// Route for handling form submission
app.post('/add-employee', (req, res) => {
  const { ename, sal, mgr, comm, deptno } = req.body;
  const query = 'INSERT INTO employees (ename, sal, mgr, comm, deptno) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [ename, sal, mgr, comm, deptno], (error, results) => {
    if (error) throw error;
    res.redirect('/'); // Optionally, redirect to a success page or back to the form
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
