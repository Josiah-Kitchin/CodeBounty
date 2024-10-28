



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
import Database from "../database/databaseInterface.js";



interface ProfileData<T> {
    user_id: number; 
    bio: string, 
    age: number, 
    gender: string, 
    preferences: object, 
    profile_picture: any, 
    location: string 
}

interface ProfileUpdateData<T> {
    bio?: string, 
    age?: number, 
    gender?: string, 
    preferences?: object, 
    profile_picture?: any, 
    location?: string 
}

class ProfileModel {
    /* The ProfileModel holds methods for storing profile data into a database
     * By default, the database is MySql, however can be changed for testing purposes 
     * Each profile holds a userId which references a user 
     * Methods
     * --------
	    
     */

    public database: Database;

    constructor() { 
	this.database = new MySqlDatabase();
    }

    public async add(profile: ProfileData<object>): Promise<void> { 
	//Add a profile with the given profile data
	try {
	    await this.database.create("profiles", profile);
	} catch (e) { 
	    throw new Error(`Error adding profile with user id: ${profile.user_id}: ${e}`);
	}
    }

    public async update(userId: number, profile: ProfileUpdateData<object>): Promise<void> {
	//update a profile with the user id and the given profile data 
	try {
	    await this.database.update("profiles", userId, profile);
	} catch (e) { 
	    throw new Error (`Error updating profile with user id: ${profile.user_id}: ${e}`)
	}
    }
}


export default ProfileModel;


















