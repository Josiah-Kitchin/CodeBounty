
/* 
     The user controller file handles requests for operations on the UserModel
*/


import {Request, Response } from 'express';
import { UserModel } from '../models/userModel.js';
import { ensureError } from '../utils/errors.js'; 


class UserController { 
    /* The user controller class handles the business logic of user operations 
     * in prescence of a request. Each method is meant to be called by the router in userRoutes
     *
     * ---- Parameters ----
	* req: Incoming Request to the API, what kind of data depends on the route  
	* res: Sets the response to the requester
	
     * ---- Methods ----- 
	* addUser 
	    * Takes a post request to add a user along side UserInfo (check user model for that interface)
	* getUserNameById
	    * Returns the name of the user given by the user's 'Id
     */

    private model: UserModel;

    constructor() { 
	this.model = new UserModel();
    }

    public async addUser(req: Request, res: Response): Promise<Response> {
	//Create a new user request GO INTO MORE DETAIL LATER 
	try {
	    await this.model.add(req.body);
	    return res.status(201).json({ message: "User Created"} );
	} catch (e) { 
	    const error = ensureError(e);
	    return res.status(400).json( {error: error.message} );
	}
    };

    public async getUserNameById(req: Request, res: Response): Promise<Response> {
	//Get a user's name by id GO INTO MORE DETAIL LATER 
	try {
	    const id = Number(req.params.id); // Get the ID from the route parameters
	    const userName = await this.model.getNameById(id);
	    return res.status(200).json({ name: userName });
	} catch (e) {
	    const error = ensureError(e);
	    if (error.message == "User Not Found") {
		return res.status(404).json( {error: error.message });
	    } 
	    return res.status(500).json( {error: error.message });
	}
    };
}

export default UserController; 
