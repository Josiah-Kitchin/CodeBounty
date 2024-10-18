/*


    

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
import bcrypt from "bcrypt";
import MySqlDatabase from "../database/mysql_database.js";
import dotenv from 'dotenv';
dotenv.config();
class User {
    database;
    constructor() {
        this.database = new MySqlDatabase();
    }
    async add(user) {
        try {
            validateUserData(user);
            user.password = hashPassword(user.password);
            this.database.create(process.env.USER_TABLE, UserData);
        }
        catch (error) {
            throw new Error(`Error adding User ${UserData.id}: ${error.message}`);
        }
    }
}
/* ------ Private ------- */
const hashPassword = async (password) => {
    /*
    hash_password function uses bcrypt to hash the password
    if the hash or salt generation from hash_passwrod fails, it will throw the failed
    hash error

    */
    const salt_rounds = parseInt(process.env.SALT_ROUNDS, 10);
    try {
        const hashed_password = await bcrypt.hash(password, salt_rounds);
        return hashed_password;
    }
    catch (error) {
        throw new Error("Error hashing password: " + error.message);
    }
};
const validateUserData = (user) => {
    /*
    validate_user_info takes the name, email and password and confirms
    it matches with our requirments.

    Requirments
    -----------
    All fields are filled in
    Valid email format
    Password length < 8
    Password contain one number and special character
    Name length between 2 and 50

    */
    if (!user.name || !user.email || !user.password) {
        throw new Error("All user info fields required");
    }
    // Validate email format using a regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
        throw new Error("Invalid email format.");
    }
    // Validate password strength
    if (user.password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }
    // check for numbers and special characters
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(user.password)) {
        throw new Error("Password must contain at least one number and one special character.");
    }
    // validate name length
    if (user.name.length < 2 || user.name.length > 50) {
        throw new Error("Name must be between 2 and 50 characters.");
    }
};
