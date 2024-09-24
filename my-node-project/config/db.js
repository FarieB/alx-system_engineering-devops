const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', // or your database host
    user: 'newuser', // replace with your MySQL username
    password: '#Farie@1989', // replace with your MySQL password
    database: 'insurance_db' // replace with your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

module.exports = connection;
