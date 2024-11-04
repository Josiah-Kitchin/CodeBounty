
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const authorizeToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['token'];
    if (!token) throw new Error("No authorization token found");


    jwt.verify(token, process.env.TOKEN_KEY as string, (err, decoded) => {
	
	if (err) {
	    console.log(token);
	    throw new Error("User not authorized")
	}
    });
    next();
}

export default authorizeToken; 
