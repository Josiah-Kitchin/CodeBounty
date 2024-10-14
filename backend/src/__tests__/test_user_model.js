
/*
Testing file using jest for the user_mode.js file
*/


const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { add_user } = require('../models/user_model'); // Adjust the path as needed

jest.mock('mysql2/promise'); // Mock the mysql2 library
jest.mock('bcrypt'); // Mock bcrypt

describe('add_user', () => {
    beforeEach(() => {
	// Clear any previous mock implementations
	mysql.createConnection.mockClear();
	bcrypt.hash.mockClear();
    });




    it('should add a user successfully', async () => {
	// Mock the database connection and execute method
	const mockConnection = {
	    query: jest.fn().mockResolvedValue([{}]), // Mock successful insertion
	    end: jest.fn(),
	};

	mysql.createConnection.mockResolvedValue(mockConnection); // Return mocked connection

	bcrypt.hash.mockResolvedValue('hashedPassword'); // Mock hashed password

	const user = await add_user('John Doe', 'john@example.com', 'password123');

	expect(mockConnection.query).toHaveBeenCalledWith(
	    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
	    ['John Doe', 'john@example.com', 'hashedPassword']
	);

	expect(user).toEqual({ name: 'John Doe', email: 'john@example.com' });
	expect(mockConnection.end).toHaveBeenCalled(); // Ensure connection is closed
    });



    /* --- Error Testing --- */

    it('should throw an error for missing input', async () => {
	await expect(add_user('', 'john@example.com', 'password123')).rejects.toThrow(
	'All user info fields required'
    );

  });
});










