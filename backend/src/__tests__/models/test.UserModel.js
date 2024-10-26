

/* ----------- Testing for the User Model (using a mock database) ------------- */


import jest from "jest";
import MockDatabase from "../../../dist/database/mockDatabase";
import { UserModel } from "../../../dist/models/userModel";

const userModel = new UserModel();
userModel.database = new MockDatabase(); 

describe('User Model Add/Get', () => {

    test("User model normal add/get", async () => {
	const testPerson = {id: 7, name: "John Test", email: "tester@gmail.com", password: "testPass42!"}; 
	const testPerson2 = {id: 8, name: "Tohn Jest", email: "bester@gmail.com", password: "bestPass42!"}; 
	await userModel.add(testPerson);
	await userModel.add(testPerson2);
	const name = await userModel.getNameById(7);
	const email = await userModel.getEmailById(7);

	expect(name).toBe("John Test"); 
	expect(email).toBe("tester@gmail.com"); 
    }); 

    test("User not found error", async () => {
	const fakeId = 2894829;

	expect(userModel.getNameById(fakeId)).rejects.toThrow("User Not Found");
	expect(userModel.getEmailById(fakeId)).rejects.toThrow("User Not Found");
    });

    test("invalid inputs", async () => {

	const testBadName = {id: 9, name: "8", email: "tester@gmail.com", password: "testPass42!"};
	const testBadEmail = {id: 10, name: "Fred Marcus", email: "hithere", password: "testPass52!"};
	const testBadPassword = {id: 11, name: "Fred Marcus", email: "tester@gmail.com", password: "haha"};

	expect(userModel.add(testBadName)).rejects.toThrow("Error adding User 8: Error: Name must be between 2 and 50 characters.")
	expect(userModel.add(testBadEmail)).rejects.toThrow("Error adding User Fred Marcus: Error: Invalid email format.")
	const p_message = `Error adding User Fred Marcus: Error: Password must 8 characters long, contain at least one number, one letter, and one special character.`
	expect(userModel.add(testBadPassword)).rejects.toThrow(p_message); 

    }); 

});

