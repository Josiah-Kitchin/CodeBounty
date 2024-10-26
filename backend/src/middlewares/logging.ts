
import {Request, Response, NextFunction} from 'express';

const logRequests = (req: Request, res: Response, next: NextFunction) => {
    /* Logs all requests to the server */
    console.log(`Incoming Request: ${req.method} ${req.url} - ${new Date()}`);
    next();
}

export default logRequests;
