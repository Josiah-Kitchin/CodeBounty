


export default interface Database {
    /* The Database interface provides the interface for any database implementation. 
     * It should only implement CRUD methods and should not be specific to certain data. 
     *
     * If a query fails, the implementation will throw an error 
     */


    // The create method takes a tableName and inserts all data from the object into the database 
    create(tableName: string, data: object): Promise<void>;
    // The get method takes a tableName, optional column names and conditions and returns an array of objects, 
    // with the key being the column names and the value being the value 
    get(tableName: string, columns?: Array<string>, conditions?: object): Promise<any>;
    //Given a tableName and id, pass in an object that will update the current information with the new object 
    update(tableName: string, id: number, data: object): Promise<void>;
    //deletes an entry based tableName and id 
    delete(tableName: string, id: number): Promise<void>;
}


