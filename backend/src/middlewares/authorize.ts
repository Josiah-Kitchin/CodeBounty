

/* < ----------------------- How Auth Works --------------------------- >  

 - A request is sent to create or log into a profile
 - A response is sent with that users token and their id. Both of these should be stored 
   in local storage on the frontend 
 - When the user makes a request, the token is put into the header of the request. The token is then 
   verified. 
 - The id is encrypted in the token, so request do not need to put the id in the body unless it is in the url 
   parameter
 - If a request needs an id in the url parameter and the operation should only be performed by the user sending the request, 
   then the id in the token will be matched up with the id. Soon i do want to change this to no longer take 
   ids in the params but only the id from the token 

 */



import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const authorizeToken = (req: Request, res: Response, next: NextFunction) => {
    /* Authorize tokens from requests. 
     * Stores the id of the user in the request 
     * Currently throws an error, but should response with a http unauthorized response 
     * Typescript doesnt like that though so have to figure that out */
	
	
    const token = req.headers['token'];
    if (!token) throw new Error("No authorization token found");

    try {
	const decoded = jwt.verify(token as string, process.env.TOKEN_KEY as string) as JwtPayload;
	req.body.id = decoded.id; 
    } catch (e) {
	throw new Error("User not authorized");
    }
    next();
}

export default authorizeToken; 
