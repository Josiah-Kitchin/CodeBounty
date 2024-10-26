

/* --------- The user controller file handles requests for operations on the UserModel -------- */


import { Request, Response } from 'express';
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
	* updateUser
	    * Takess a put request and updates the users info based on what data is given by the user's id 
	* getUserNameById
	    * Takes a get request and returns the name of the user given by the user's Id
	* getUserEmailById
	    * Takes a get request and returns the email of the user given by the user's Id'
	* deleteUser
	    * Takes a delete request and deletes the user of the given id 
     */

    private model: UserModel;

    constructor() { 
	this.model = new UserModel();
    }

    public async addUser(req: Request, res: Response): Promise<Response> {
	/* Create a new user request 
	 * The request must include: 
	     * {name: string, 
	     * {email: string, 
	     * {password: string}
	*/ 
	try {
	    await this.model.add(req.body); 
	    return res.status(201).json({ message: "User Created"} );
	} catch (e) { 
	    const error = ensureError(e);
	    return res.status(400).json( {error: error.message} );
	}
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
	/* Updates a users data, expects an object with an id and all of the user parameters 
	*
	 * The request body must include ---->  
	    * {id: number}
	 * The request body can include ----> 
	    * {name: string,  
	    * {email: string, 
	    * {password: string 
	 * The response will be ---> 
	    * {status message: string} */
	
	try { 
	    const id = Number(req.params.id); 
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
	 * The request must include ---->  
	    * {id: number}
	 * The response will be ---> {name: string}
	    * {status message: string}
	    * {name: string}
	 */

	try {
	    const id = Number(req.params.id); // Get the ID from the route parameters
	    const userName = await this.model.getNameById(id);
	    return res.status(200).json({ name: userName });
	} catch (e) {
	    const error = ensureError(e);
	    if (error.message.startsWith("User Not Found")) {
		return res.status(404).json( {error: error.message });
	    } 
	    return res.status(500).json( {error: error.message });
	}
    }

    public async getUserEmailById(req: Request, res: Response): Promise<Response> { 
	/* Get a user's email by their id
	 * The request must include ---->  
	    * {id: number}
	 * The response will be ---> 
	    * {status message: string}
	    * {email: string}
	 */
	try {
	    const id = Number(req.params.id); // Get the ID from the route parameters
	    const userEmail = await this.model.getEmailById(id);
	    return res.status(200).json({ email: userEmail });
	} catch (e) {
	    const error = ensureError(e);
	    if (error.message.startsWith("User Not Found")) {
		return res.status(404).json({ error: error.message });
	    } 
	    return res.status(500).json({ error: error.message });
	}
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> { 
	/* Delete a user's data by their id
	 * The request must include ---->
	    * {id: number}
	 * The response will be ---> 
	    * {status message: string}
	 */ 
	   
	try { 
	    const id = Number(req.params.id); 
	    await this.model.delete(id);
	    return res.status(200).json({ message: "User deleted" });
	} catch (e) { 
	    const error = ensureError(e);
	    if (error.message.startsWith("User Not Found")) {
		return res.status(404).json({ error: error.message});
	    }
	    return res.status(500).json({ error: error.message });
	}
    }

    public async logInUser(req: Request, res: Response): Promise<Response> {
	 try {
	    const email = req.body.email; 
	    const password = req.body.password; 
	    await this.model.logIn(email, password);
	    return res.status(200).json({ message: "User logged in" });
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
