import dotenv from 'dotenv';
import { createConnection } from "mysql2/promise.js";
//Configures the enviornment variables from .env in the root dir
dotenv.config();
class MySqlDatabase {
    /*
     * The MySqlDatabase is an implementation of the Database Interface. It implements simple CRUD
     * methods and should not be implementing methods specific to certain data objects.
     * I.E. general methods for reading, creating, etc
     * but no methods for adding Users
    */
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
        try {
            await db.execute(query);
        }
        finally { //cut connection to the database despite any errors 
            await db.end();
        }
    }
    async get(tableName, columns, conditions) {
        /* The get method returns ans object filled with columns and their values
         * from the table.
         *
         *
         * Arguments
         * ---------
             * tableName: The table to be queried
             * columns?: An optional array of column names
             * conditions?: an optional array of conditions
             *
             * If columns are empty, then it selects all (*)
             * If conditions are empty, there are no conditions
         */
        const db = await createConnection(this.options);
        //Parse the column names, assign * if the column argument is empty
        const columnNames = columns ? columns.join(', ') : '*';
        // Create the conditional query, leave empty if none 
        const conditionQuery = conditions ? 'WHERE ' + conditions.join(', AND ') : '';
        const query = `SELECT ${columnNames} FROM ${tableName} ${conditionQuery}`;
        try {
            const results = await db.execute(query);
            //Return the first element of the array, as that is the table data and not the parameters of the db
            return results.length > 1 ? results[0] : [];
        }
        finally {
            await db.end();
        }
    }
    async update(tableName, id, data) {
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
        }
        finally {
            await db.end();
        }
    }
    async delete(tableName, id) {
        /* Deletes a an entry from a given tableName based on id */
        const db = await createConnection(this.options);
        const query = `DELETE FROM ${tableName} WHERE id = ${id}`;
        try {
            const results = await db.execute(query);
        }
        finally {
            await db.end();
        }
    }
}
export default MySqlDatabase;
