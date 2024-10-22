
import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController.js' 

const router = Router(); 
const userController = new UserController();




//Create a new user post request 
router.post('/users', (req: Request, res: Response) => { userController.addUser(req, res) });   

//Get a user's name by id
router.get('/users/name/:id', (req: Request, res: Response) => { userController.getUserNameById(req, res) }); 

//Get a user's email by id'
router.get('/users/email/:id', (req: Request, res: Response) => { userController.getUserEmailById(req, res) });

//Update the user data
router.put("/users", (req: Request, res: Response) => { userController.updateUser(req, res) });  






export default router; 

