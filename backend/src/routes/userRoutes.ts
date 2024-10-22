
import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController.js' 

const router = Router(); 
const userController = new UserController();




//Create a new user request 
router.post('/users', (req: Request, res: Response) => {userController.addUser(req, res)});   

//Get a user's name by id
router.get('/users/:id', (req: Request, res: Response) => {userController.getUserNameById(req, res)}); 


export default router; 

