/*
    SQL Profile Table
    ------------------
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     bio TEXT,
     age INT,
     gender VARCHAR(10),
     preferences JSON,
     profile_picture VARCHAR(255),
     location VARCHAR(100),
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

*/
import MySqlDatabase from "../database/mysqlDatabase.js";
class ProfileModel {
    /* The ProfileModel holds methods for storing profile data into a database
     * By default, the database is MySql, however can be changed for testing purposes
     * Each profile holds a userId which references a user
     * Methods
     * --------
        
     */
    database;
    constructor() {
        this.database = new MySqlDatabase();
    }
    async add(profile) {
        try {
            await this.database.create("profiles", profile);
        }
        catch (e) {
            throw new Error(`Error adding profile with user id: ${profile.user_id}: ${e}`);
        }
    }
}
export default ProfileModel;
