

import jest from "jest";
import MockDatabase from "../database/mock_database.js"
import {UserModel} from "../models/userModel.js"

const userModel = new UserModel();
userModel.database = new MockDatabase(); 

describe('UserModel', () => {
    test('should create new user', () => {
	const user = {name: 'tester', email:'testing@gmail.com', password:'testing_password'};
	userModel.add(user);
	expect(userModel.database.get('users').name).toBe("tester");
    });
	
});
