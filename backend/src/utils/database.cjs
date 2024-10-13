
/*
Connects to the mysql database and returns the connection 
*/ 

//Load the enviornment variables
require('dotenv').config({path:__dirname+'/./../../.env'})


const mysql = require('mysql2'); // A common js module

const db_connection = mysql.createConnection({
  host: process.env.DB_HOST,      
  user: process.env.DB_USER,   
  password: process.env.DB_PASS,
  database: process.env.DB_NAME 
});

db_connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db_connection.threadId);
});

