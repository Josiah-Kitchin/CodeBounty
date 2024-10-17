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
        await db.execute(query);
        await db.end();
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
        const columnNames = columns ? columns.join(', ') : '*';
        const conditionQuery = conditions ? 'WHERE ' + conditions.join(', AND ') : '';
        const query = `SELECT ${columnNames} FROM ${tableName} ${conditionQuery}`;
        const results = await db.execute(query);
        results.forEach((entry) => {
            entry.forEach((user) => {
                if (user.id) {
                    console.log(`User ID: ${user.id}, Name: ${user.name}, Age: ${user.email}`);
                }
            });
        });
        await db.end();
    }
}
export default MySqlDatabase;
