/*
    
    The MySqlDatabase is an implementation of the Database Interface. It implements simple CRUD
    methods and should not be implementing methods specific to certain data objects. jj
    I.E. general methods for reading, creating, etc
    but no methods for adding Users

*/
import dotenv from 'dotenv';
import { createConnection } from "mysql2/promise.js";
//Configures the enviornment variables from .env in the root dir
dotenv.config();
class MySqlDatabase {
    options;
    constructor() {
        this.options = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        };
    }
    async create(tableName, data) {
        /* Take a table name and insert the values paired with the given keys into the database */
        const db = await createConnection(this.options);
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `"${value}"`).join(', ');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        await db.execute(query);
        await db.end();
    }
}
export default MySqlDatabase;
