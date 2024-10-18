import mySqlDatabase from './database/mysql_database.js';
const db = new mySqlDatabase();
try {
    const data = await db.get("users", ["email", "name"]);
    console.log(data);
}
catch (e) {
    console.log(e);
}
