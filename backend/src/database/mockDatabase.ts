
import Database from "./databaseInterface.js";



class MockDatabase implements Database { 
    /* The MockDatabase is used for testing purposes. It allows the testing of models without affecting 
     * the database used in production
     */
    
    public tables: any; 
    constructor(){ 
	this.tables = {users: []};
    }
     
    public async create(tableName: string, data: object): Promise<void> { 
	this.tables[tableName].push(data);
    }

    public async get(tableName: string, columns?: Array<string>, conditions?: object): Promise<any> { 
	//Not currently implmented with columns 
	
	if (!conditions) { 
	    //Return everything in that table 
	    return this.tables[tableName];
	} 
	
	const matchedTables = []
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

    public async update(tableName: string, id: number, data: object): Promise<void> { 
	for (let table of this.tables[tableName]) { 
	    if (table.id == id) {
		Object.assign(table, data);
	    }
	}
    }

    public async delete(tableName: string, id: number) { 
	this.tables[tableName] = this.tables[tableName].filter((entry: object) => entry.id !== id);
    }

}

export default MockDatabase
