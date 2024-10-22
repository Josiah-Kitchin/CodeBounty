
/* 
     The user controller file handles requests for operations on the UserModel
*/


import { Request, Response } from 'express';
import UserModel from '../models/userModel.js'


const userModel = new UserModel();

const createUser = async (req: Request, res: Response): Response => {
    //Create a new user request GO INTO MORE DETAIL LATER 
    try {
	await userModel.create(req.body);
	return res.status(201).json({ message: "User Created"} );
    } catch (error) { 
	return res.status(400).json( {error: error.message} );
    }
});

const getUserNameById = async (req: Request, res: Response): Response => {
    //Get a user's name by id GO INTO MORE DETAIL LATER 
    try {
	const id = req.params.id; // Get the ID from the route parameters
	const userName = await userModel.getNameById(id);
	return res.status(200).json({ name: userName });
    } catch (error) {
	if (error.message == "User Not Found") {
	    return res.status(404).json( {error: error.message });
	} 
	return res.status(500).json( {error: error.message });
    }
});

export { createUser, getUserNameById }; 
