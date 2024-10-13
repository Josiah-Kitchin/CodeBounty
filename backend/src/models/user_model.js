

/*

The User model handles CRUD operations on the user table 


Functions
--------------
add_user(name, email, password): 
    Adds user to the database 


SQL user Table 
--------------

id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each user
name VARCHAR(100) NOT NULL,          -- User's name
email VARCHAR(100) NOT NULL UNIQUE,   -- User's email, must be unique
password VARCHAR(255) NOT NULL,       -- User's hashed password
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of user creation
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp of last update
);

Encryption
--------------
Encryption is done using the bcrypt module


*/ 

import db_connection from '../utils/database.cjs';
import pkg from 'bcrypt';
const { bcrypt } = pkg; //required as bcrypt is a commonJS module



const add_user = async (name, email, password) => {
/* 
    The add_user function adds new user information to the user table
    The password is hashed and salted using bcrypt 

    Arguments
    ----------
    name : string
	A string of the users full name (<=100 chars)
    email : string
	the users email (<=100 chars)
    password : string
	the users password (<=255 chars)
*/ 

    //Encyption 
    const salt_rounds = 10; //number of times the hashing algorithm processes the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_password = await bcrypt.hash(password, salt); 


    const sql = 'INSERT INTO User (name, email, password) VALUES (?, ?, ?)';
  
    db_connection.query(sql, [id, username, hashed_password], (error, results) => {
    if (error) {
	console.error('Error adding user:', error);
	throw error; 
    } else {
	console.log('User added');
    }});
};

export {add_user}
