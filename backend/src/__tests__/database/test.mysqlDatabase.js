
/* ----------- Testing for the database functions (using a mock database) ------------- */


import jest from "jest";
import {conditionToSql} from "../../../dist/database/mysqlDatabase";


describe('Convert conditions', () => {

    test("Converts a condition object to a proper sql condition ", () => {
	const condition = {"ID": 7};
	expect(conditionToSql(condition)).toBe("ID = 7");
    }); 

    test("Converts multiple conditions", () => {
	const conditions = {"ID": 6, "name": "john", "email": "nothing"};
	expect(conditionToSql(conditions)).toBe(`ID = 6, AND name = 'john' AND email = 'nothing'`);
    })

});

