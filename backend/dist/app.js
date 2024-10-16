import mySqlDatabase from './utils/mysql_database.js';
const db = new mySqlDatabase();
db.create("users", { name: "testing1", email: "testing2", password: "testing3" });
