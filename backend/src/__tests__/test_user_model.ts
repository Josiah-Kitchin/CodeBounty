

import jest from "jest";
import MockDatabase from "../database/mock_database.js"
import {UserModel} from "../models/userModel.js"

const userModel = new UserModel();
userModel.database = new MockDatabase(); 

describe('UserModel', () => {
    test('should create new user', () => {
    });
});
