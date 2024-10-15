

/*

The User model handles CRUD operations on the user table 


Functions
--------------
add_user(name, email, password): 
    Adds user to the database with name, email, and a hash of their password 

    

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


//
//
//const db_connection = require("../utils/database.js");
//const bcrypt = require("bcrypt");
//const dotenv = require("dotenv");
//
//
//dotenv.config();
//
//
//export interface User<T> { 
//    name: string; 
//    email: string; 
//    password: string; 
//}
//
//
///* ----- Public ----- */
//
//const add_user = async (name, email, password) => {
///* 
//    The add_user function adds new user information to the user table
//    The password is hashed and salted using bcrypt 
//
//    Arguments
//    ----------
//    name : string
//	A string of the users full name (<=100 chars)
//    email : string
//	the users email (<=100 chars)
//    password : string
//	the users password (<=255 chars)
//*/ 
//
//    try { 
//
//	validate_user_info(name, email, password);
//
//	const hashed_password = await hash_password(password);
//
//	const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
//
//	db_connection.query(sql, [name, email, hashed_password], (error, results) => {
//	    if (error) throw error; 
//	});
//
//
//    } catch (error) { 
//	throw error; 
//    } 
//};
//
//
//
//
//
///* ------ Private ------- */
//
//const hash_password = async (password) => { 
//    /* 
//	hash_password function uses bcrypt to hash the password
//	if the hash or salt generation from hash_passwrod fails, it will throw the failed 
//	hash error
//
//    */
//    const salt_rounds = parseInt(process.env.SALT_ROUNDS, 10); 
//    try { 
//	const hashed_password = await bcrypt.hash(password, salt_rounds);
//	return hashed_password; 
//    } catch (error) { 
//	throw new Error("Error hashing password: " + error.message);
//    } 
//}
//
//const validate_user_info = (name, email, password) => {
//    /*
//	validate_user_info takes the name, email and password and confirms 
//	it matches with our requirments. 
//
//	Requirments
//	-----------
//	All fields are filled in 
//	Valid email format
//	Password length < 8 
//	Password contain one number and special character 
//	Name length between 2 and 50
//
//    */
//    if (!name || !email || !password) { 
//	throw new Error("All user info fields required");
//    }
//
//    // Validate email format using a regex
//    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//    if (!emailRegex.test(email)) {
//	throw new Error("Invalid email format.");
//    }
//
//    // Validate password strength
//    if (password.length < 8) {
//	throw new Error("Password must be at least 8 characters long.");
//    }
//
//    // check for numbers and special characters
//    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
//    if (!passwordRegex.test(password)) {
//	throw new Error("Password must contain at least one number and one special character.");
//    }
//
//    // validate name length
//    if (name.length < 2 || name.length > 50) {
//	throw new Error("Name must be between 2 and 50 characters.");
//    }
//}
//
//
//module.exports = {add_user, User};
