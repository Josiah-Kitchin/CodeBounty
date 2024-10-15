

/*
    
    The MySqlDatabase is an implementation of the Database Interface. It implements simple CRUD 
    methods and should not be implementing methods specific to certain data objects. jj
    I.E. general methods for reading, creating, etc
    but no methods for adding Users

*/

import dotenv from 'dotenv';
import Database from './database_interface.ts';
import {ConnectionOptions, createConnection} from "mysql2/promise.js";

//Configures the enviornment variables from .env in the root dir
dotenv.config()

export class MySqlDatabase implements Database {
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
	/* Take a table name and insert the values paired with the given keys into the database */

	const db = await createConnection(this.options); 

	//Parse the data object so it can be put into the SQL query 
	const columns = Object.keys(data).join(', '); 
	const placeHolders = Object.keys(data).map(() => '?').join(', ');
	const values = Object.values(data);

	const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeHolders})`;

	await db.execute(query)
	await db.end(); 
    }   
}

const db = new MySqlDatabase(); 
db.create("users", {name: "hi", email:"there", password:"josiah"});


