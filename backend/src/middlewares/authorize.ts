
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const authorizeToken = (req: Request, res: Response, next: NextFunction) => {
    /* Authorize tokens from requests. 
     * Currently throws an error, but should response with a http unauthorized response 
     * Typescript doesnt like that though so have to figure that out */
	
	
    const token = req.headers['token'];
    if (!token) throw new Error("No authorization token found");


    jwt.verify(token, process.env.TOKEN_KEY as string, (err, decoded) => {
	if (err) {
	    throw new Error("User not authorized")
	}
    });
    next();
}

export default authorizeToken; 
