class MockDatabase {
    /* The MockDatabase is used for testing purposes. It allows the testing of models without affecting
     * the database used in production
     */
    tables;
    constructor() {
        this.tables = { users: [] };
    }
    async create(tableName, data) {
        this.tables[tableName].push(data);
    }
    async get(tableName, columns, conditions) {
        //Not currently implmented with columns 
        if (!conditions) {
            //Return everything in that table 
            return this.tables[tableName];
        }
        const matchedTables = [];
        const conditionEntries = Object.entries(conditions);
        //Search through the tables with the given table name 
        for (const table of this.tables[tableName]) {
            const tableEntries = Object.entries(table);
            let equal = true;
            //If the do not keys match, set equal to false, continuing the loop
            for (const i of conditionEntries.keys()) {
                if (tableEntries.at(i).at(1) != conditionEntries.at(i).at(1)) {
                    equal = false;
                }
            }
            //if all the keys matched, push it to the array of matched tables 
            if (equal) {
                matchedTables.push(table);
            }
        }
        return matchedTables;
    }
    async update(tableName, id, data) {
        return;
    }
    async delete(tableName, id) {
        return;
    }
}
export default MockDatabase;
