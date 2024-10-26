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
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import MySqlDatabase from "../database/mysqlDatabase.js";
dotenv.config();
class UserModel {
    /* The UserModel holds methods for storing user data into a database
     * By default, the database is MySql, however can be changed for testing purposes
     *
     * Methods
     * --------
    *  add(user: UserData<object>) Promise<void>
        * Responsible for validating user data, hashing password, and adding user data into the database
    *  getNameById(id: number): Promise<string>
        * returns the name of the user with the given id
    *  getEmailById(id: number): Promise<string>
        * returns the email of the user with the given id
    *  update(id: number, UserUpdateData: object): Promise<void>
        * updates the data of the user with the given id
    *  delete(id: number): Promise<void>
        * Deletes all data from the database of the user with the given id
     */
    database;
    constructor() {
        this.database = new MySqlDatabase();
    }
    async add(user) {
        /* The add method takes User data, validates the entries, hashes the password, then adds the data
         * to the database. If any of these operations fail, it will throw an error
         */
        try {
            validateNewUser(user);
            user.password = await hashPassword(user.password);
            //await this.database.create(process.env.USER_TABLE, user);
            await this.database.create("users", user);
        }
        catch (error) {
            throw new Error(`Error adding User ${user.name}: ${error}`);
        }
    }
    async getNameById(id) {
        //Returns the name of the user by id
        const name = await this.database.get("users", ["name"], { ID: id });
        //the database get method returns a list of objects
        if (name.length < 1) {
            throw new Error(`User Not Found`);
        }
        return name.at(0).name;
    }
    async getEmailById(id) {
        //Returns the email of the user by id 
        const email = await this.database.get("users", ["email"], { "ID": id });
        if (email.length < 1) {
            throw new Error("User Not Found");
        }
        return email.at(0).email;
    }
    async update(id, data) {
        //Updates the user's name found from their id  
        try {
            validateUserUpdate(data);
            if (data.password !== undefined) {
                data.password = await hashPassword(data.password);
            }
            await this.database.update("users", id, data);
        }
        catch (error) {
            throw new Error(`Error updating User ${id}: ${error}`);
        }
    }
    async delete(id) {
        //Deletes a user from the database found by their id 
        try {
            await this.database.delete("users", id);
        }
        catch (error) {
            throw new Error(`User Not Found ${id}: ${error}`);
        }
    }
}
export { UserModel };
/* ------ Private ------- */
const hashPassword = async (password) => {
    /*
    hash_password function uses bcrypt to hash the password
    if the hash or salt generation from hash_passwrod fails, it will throw the failed
    hash error

    */
    //const salt_rounds = parseInt(process.env.SALT_ROUNDS, 10); 
    const salt_rounds = 10;
    try {
        const hashed_password = await bcrypt.hash(password, salt_rounds);
        return hashed_password;
    }
    catch (error) {
        throw new Error(`Error hashing password: ${error}`);
    }
};
const validateNewUser = (user) => {
    /*
    validate_user_info takes the name, email and password and confirms
    it matches with our requirments.

    Requirments
    -----------
    All fields are filled in
    Valid email format
    Password length > 8
    Password contain one number and special character
    Name length between 2 and 50 and contain only letters

    */
    if (!user.name || !user.email || !user.password) {
        throw new Error("All user info fields required");
    }
    // Validate email format using a regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
        throw new Error("Invalid email format.");
    }
    // check for numbers and special characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(user.password)) {
        throw new Error("Password must 8 characters long, contain at least one number, one letter, and one special character.");
    }
    // validate name length and letters 
    const nameTest = /^[A-Z]+$/i;
    if ((user.name.length < 2 || user.name.length > 50) && nameTest.test(user.name)) {
        throw new Error("Name must be between 2 and 50 characters.");
    }
};
const validateUserUpdate = (data) => {
    if (data.email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error("Invalid email format.");
        }
    }
    if (data.password !== undefined) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(data.password)) {
            throw new Error("Password must 8 characters long, contain at least one number, one letter, and one special character.");
        }
    }
    if (data.name !== undefined) {
        const nameTest = /^[A-Z]+$/i;
        if (data.name.length < 2 || data.name.length > 50) {
            throw new Error("Name must be between 2 and 50 characters.");
        }
    }
};
