import mySqlDatabase from './database/mysql_database.js';
const db = new mySqlDatabase();
db.get("users");
