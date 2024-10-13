
/*
Testing file using jest for the user_mode.js file

not currently working cause of ES6 javascript 
*/

import {jest} from '@jest/globals';
import add_user from '../models/user_model';

jest.mock('mysql2/promise');
jest.mock('bcrypt');

describe('add_user', () => {
    const name = "John Doe";
    const email = "testing@gmail.com";
    const password = "password123";

    beforeEach(() => {
	bcrypt.hash.mockResolvedValue(password, 10);
	mysql.createConnection.mockResolvedValue({
	    execute: jest.fn().mockResolvedValue([{}]), // Mock successful execution
	    end: jest.fn().mockResolvedValue(), // Mock closing connection
	});
    });

    it('should add a user successfully', async () => {
	const result = await addUser(name, email, password);
	expect(result).toEqual({ success: true });
	expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
	
	// Check that the execute method was called with the correct SQL query and parameters
	const connection = await mysql.createConnection();
	expect(connection.execute).toHaveBeenCalledWith(
	  'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
	  [name, email, hashedPassword]
	);
    });

  it('should throw an error if adding user fails', async () => {
    mysql.createConnection.mockResolvedValueOnce({
      execute: jest.fn().mockRejectedValue(new Error('Database error')),
      end: jest.fn().mockResolvedValue(),
    });

    await expect(addUser(name, email, password)).rejects.toThrow('Failed to add user');
  });
});

