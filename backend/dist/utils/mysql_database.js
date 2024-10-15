/*
    
    The MySqlDatabase is an implementation of the Database Interface. It implements simple CRUD
    methods and should not be implementing data specific methods. I.E. general methods for reading, creating, etc
    but no methods for adding Users

*/
import dotenv from 'dotenv';
import mysqlPromise from "mysql2/promise.js";
dotenv.config();
export class MySqlDatabase {
    env;
    constructor() {
        this.env = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        };
    }
    async create(tableName, object) {
        const db = await mysqlPromise.createConnection(this.env);
        const columns = Object.keys(object).join(', ');
        const placeHolders = Object.keys(object).map(() => '?').join(', ');
        const values = Object.values(object);
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeHolders})`;
        await db.execute(query);
        await db.end();
    }
}


