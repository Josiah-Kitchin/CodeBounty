

import jest from "jest";
import MockDatabase from "../database/mock_database.js"
import {UserModel} from "../models/userModel.js"

const userModel = new UserModel();
userModel.database = new MockDatabase(); 
userModel.database.table = {users: []};

describe('UserModel', () => {
    test('should create new user', () => {
	const user = {name: 'tester', email:'testing@gmail.com', password:'testing_password'};
	userModel.add(user);
	expect(userModel.database.tables.users[0].name).toBe("tester");
	expect(userModel.database.tables.users[0].email).toBe("testing@gmail.com");
	expect(userModel.database.tables.users[0].password).not.toBe("testing_password");
    });
	
});
