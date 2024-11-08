

/* --------- The user controller file handles requests for operations on the UserModel -------- */


import { Request, Response } from 'express';
import { UserModel } from '../models/userModel.js';
import { ensureError } from '../utils/errors.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });


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
	* updateUser
	    * Takess a put request and updates the users info based on what data is given by the user's id 
	* getUserNameById
	    * Takes a get request and returns the username of the user given by the user's Id
	* getUserEmailById
	    * Takes a get request and returns the email of the user given by the user's Id'
	* deleteUser
	    * Takes a delete request and deletes the user of the given id 
	* loginUser
	    * Takes a request to log in and returns the id of the user and status 
     */

    public model: UserModel;

    constructor() { 
	this.model = new UserModel();
    }

    public async addUser(req: Request, res: Response): Promise<Response> {
	/* Create a new user request 
	 * The request must include ---->  
	     * {username: string, 
	     * {email: string, 
	     * {password: string}
	 * The response will be ---> 
	    * { status message: string
		token: string }
	*/ 
	try {
	    await this.model.add(req.body); 
	    const id = Number(await this.model.getIdByEmail(req.body.email));
	    const token = generateToken(id);

	    return res.status(201).json({ message: "User logged in", id: id, token: token });

	} catch (e) { 
	    const error = ensureError(e);
	    return res.status(400).json( {error: error.message} );
	}
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
	/* Updates a users data, expects an object with an id and all of the user parameters 
	 *
	 * The request body can include ----> 
	    * {username: string,  
	    * {email: string, 
	    * {password: string 
	    * {token: string}
	 * The response will be ---> 
	    * {status message: string} */
	
	try { 
	    const id = req.body.id;
	    delete req.body.id; 
	    const userData = req.body;
	    await this.model.update(id, userData);
	    return res.status(201).json({ message: "User Updated "});

	} catch (e) { 
	    const error = ensureError(e); 
	    if (error.message.startsWith("User Not Found")) { 
		return res.status(404).json( {error: error.message });
	    }
	    return res.status(500).json({ error: error.message });
	}
    }

    public async getUserNameById(req: Request, res: Response): Promise<Response> {
	/* Get a user's name by their id
	 * Takes a users id in the params 
	 * The response will be ---> {username: string}
	    * {status message: string}
	    * {username: string}
	 */

	try {
	    const id = Number(req.params.id); // Get the ID from the route parameters
	    const userName = await this.model.getNameById(id);
	    return res.status(200).json({ username: userName });

	} catch (e) {
	    const error = ensureError(e);
	    if (error.message.startsWith("User Not Found")) {
		return res.status(404).json({ error: error.message });
	    } 
	    return res.status(500).json({ error: error.message });
	}
    }

    public async getUserEmailById(req: Request, res: Response): Promise<Response> { 
	/* Get a user's email by their id
	 * Takes in the id from the param 
	 * The response will be ---> 
	    * {status message: string}
	    * {email: string}
	 */
	try {
	    const id = Number(req.params.id); // Get the ID from the route parameters
	    if (id !== req.body.id) { //make sure no one got their token then trying to look up peoples emails
		throw new Error("Unauthorized");
	    }
	    const userEmail = await this.model.getEmailById(id);
	    return res.status(200).json({ email: userEmail });
	    
	} catch (e) {
	    const error = ensureError(e);
	    if (error.message.startsWith("User Not Found")) {
		return res.status(404).json({ error: error.message });
	    } 
	    if (error.message.startsWith("Unauthorized")) { 
		return res.status(401).json({ error: error.message });
	    }
	    return res.status(500).json({ error: error.message });
	}
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> { 
	/* Delete a user's data by their id
	 * Takes an id in the parameter 
	 * The response will be ---> 
	    * {status message: string}
	 */ 
	   
	try { 
	    const id = Number(req.params.id); 
	    if (req.body.id !== id) { 
		throw new Error ("Unauthorized");
	    }
	    await this.model.delete(id);
	    return res.status(200).json({ message: "User deleted" });

	} catch (e) { 
	    const error = ensureError(e);
	    if (error.message.startsWith("User Not Found")) {
		return res.status(404).json({ error: error.message});
	    }
	    if (error.message.startsWith("Unauthorized")) { 
		return res.status(401).json({ error: error.message });
	    }
	    return res.status(500).json({ error: error.message });
	}
    }

    public async logInUser(req: Request, res: Response): Promise<Response> {
	/* Returns ok status if the user successfully logs in, an error otherwise 
         * The request must include ---> 
	    * {email: string, password: string}
	 * The response will be ---> 
	    * {status message: string, 
	    *  id: number
	    *  token: string }
	 */
	try {
	    const email = req.body.email; 
	    const password = req.body.password; 
	    await this.model.logIn(email, password);
	    const id = Number(await this.model.getIdByEmail(email));
	    
	    const token = generateToken(id);

	    return res.status(200).json({ message: "User logged in", id: id, token: token });

	} catch (e) {
	    const error = ensureError(e);
	    if (error.message.startsWith("Incorrect")) { 
		return res.status(404).json({ error: error.message });
	    } 
	    return res.status(500).json({ error: error.message });
	} 
    }
}

export default UserController; 


/* ----- Private ----- */

const generateToken = (userId: number): string => {
    return jwt.sign({ id: userId }, process.env.TOKEN_KEY as string);
}
