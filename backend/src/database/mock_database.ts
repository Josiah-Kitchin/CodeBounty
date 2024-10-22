
import Database from "./database_interface.js";



class MockDatabase implements Database { 
    /* The MockDatabase is used for testing purposes. It allows the testing of models without affecting 
     * the database used in production
     */
    
    public tables: any; 
    constructor(){ 
	this.tables = {users: []};
    }
     
    public async create(tableName: string, data: object): Promise<void> { 
	await this.tables.tableName.push(data);
    }

    public async get(tableName: string, columns?: Array<string>, conditions?: Array<string>): Promise<any> { 
	return this.tables.tableName; 
    }

    public async update(tableName: string, id: number, data: object): Promise<void> { 
	return 
    }

    public async delete(tableName: string, id: number) { 
	return 
    }

}

export default MockDatabase
