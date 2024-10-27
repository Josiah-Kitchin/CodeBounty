

import dotenv from 'dotenv';
import Database from './databaseInterface.js';
import {ConnectionOptions, createConnection, QueryResult} from "mysql2/promise.js";

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
	const values = Object.values(data).map(value => `'${value}'`).join(', ');
	const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

	try {
	    await db.execute(query);
	}  finally { //cut connection to the database despite any errors 
	    await db.end(); 
	}
    }  

    public async get(tableName: string, columns?: Array<string>, conditions?: object): Promise<QueryResult> { 
	/* The get method returns ans object filled with columns and their values
	 * from the table. 	
	 *  
	 *
	 * Arguments
	 * ---------
	     * tableName: The table to be queried
	     * columns?: An optional array of column names  
	     * conditions?: an optional array of conditions in json form  
	     *        
	     * If columns are empty, then it selects all (*)
	     * If conditions are empty, there are no conditions 
	 */

	const db = await createConnection(this.options);

	//Parse the column names, assign * if the column argument is empty
	const columnNames = columns ? columns.join(', ') : '*';
	//Turn the condition object into sql conditions
	const conditionStatement = conditions ? conditionToSql(conditions) : '';
	//Connect the statements together 
	const conditionQuery = 'WHERE ' + conditionStatement;
	const query = `SELECT ${columnNames} FROM ${tableName} ${conditionQuery}`;

	try {
	    const results = await db.execute(query);
	    //Return the first element of the array, as that is the table data and not the parameters of the db
	    return results.length > 1 ? results[0] : []; 
	} finally {
	    await db.end(); 
	}
    }

    public async update(tableName: string, id: number, data: object): Promise<void> { 
	/* Updates a database entry based on its tableName and id with the given data 
	 * Arguments
	 * ---------
	     * tableName: The table to be queried
	     * id: the relational id that is uniquely given to each user
	     * data: an object that corresponds to the databse columns
	     * (data should be some interface depending on model )
	 */

	const db = await createConnection(this.options);

	//Parse the data to get the columns and values ready for the query 
	const setValues = Object.entries(data).map(([key, value]) => `${key} = '${value}'`).join(', ');

	const query = `UPDATE ${tableName} SET ${setValues} WHERE id = ${id}`;

	try {
	    const results = await db.execute(query);
	} finally {
	    await db.end(); 
	}
    }

    public async delete(tableName: string, id: number): Promise<void> { 
	/* Deletes an entry from a given tableName based on id */
	const db = await createConnection(this.options);

	const query = `DELETE FROM ${tableName} WHERE id = ${id}`;
	try {
	    const results = await db.execute(query);
	} finally {
	    await db.end(); 
	}
    }
}


/* ------------------------------------ Private ----------------------------------------------- */

const conditionToSql = (condition: object): string => { 
    //Converts an object to an sql statement. The statement will have quotes 
    //around the value if the value is not a number 
    const sqlConditions = Object.entries(condition).map(([key, value]) => {
	    if (typeof value === 'number') { 
		return `${key} = ${value}`
	    } else { 
		return `${key} = '${value}'`
	    } 
    });

    return sqlConditions.join(' AND ')
}

export default MySqlDatabase
export {conditionToSql};



