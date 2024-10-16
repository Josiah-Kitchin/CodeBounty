

import dotenv from 'dotenv';
import Database from './database_interface.js';
import {ConnectionOptions, createConnection} from "mysql2/promise.js";

//Configures the enviornment variables from .env in the root dir
dotenv.config()

class MySqlDatabase implements Database {
    /*
     * The MySqlDatabase is an implementation of the Database Interface. It implements simple CRUD 
     * methods and should not be implementing methods specific to certain data objects. 
     * I.E. general methods for reading, creating, etc
     * but no methods for adding Users
    */

    
    private options: ConnectionOptions;

    constructor() {
	this.options = {
	    host: process.env.DB_HOST,      
	    user: process.env.DB_USER,   
	    password: process.env.DB_PASS,
	    database: process.env.DB_NAME 
	};
    }

    public async create(tableName: string, data: object): Promise<void> {
	/* The create method takes a table name and a data object and executes an 
	 * INSERT INTO query. 
	 *
	 * Arguments
	 * ---------
	     *  tableName: The table to be queried 
	     *  data: Any type of object, expecting key value pairs, where the keys 
	     *        are treated as column names and the values are the value to the 
	     *        corresponding column
	*/

	//Connect to the database 
	const db = await createConnection(this.options); 

	//Parse the data object into a valid sql query
	const columns = Object.keys(data).join(', '); 
	const values = Object.values(data).map(value => `"${value}"`).join(', ');
	const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

	await db.execute(query)
	await db.end(); 
    }   
    
    public async get(tableName: string): Promise<T> { 
	/*  
	 *  
	 *
	 * Arguments
	 * ---------
	     * 
	     *   
	     *        
	     *        
	 *
	 */
	    
	    

    }
}

export default MySqlDatabase;



