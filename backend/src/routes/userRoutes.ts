
import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController.js'; 
import authorizeToken from '../middlewares/authorize.js';

const router = Router(); 
const userController = new UserController();




//Create a new user post request 
router.post('/', (req: Request, res: Response) => { userController.addUser(req, res); });   

//Get a user's name by id
router.get('/name/:id', authorizeToken, (req: Request, res: Response) => { userController.getUserNameById(req, res); }); 

//Get a user's email by id'
router.get('/email/:id', authorizeToken, (req: Request, res: Response) => { userController.getUserEmailById(req, res); });

//Update the user data with new data 
router.put("/:id", authorizeToken, (req: Request, res: Response) => { userController.updateUser(req, res); });  

//Delete the users data based on id 
router.delete("/:id", authorizeToken, (req: Request, res: Response) => { userController.deleteUser(req, res); });  

//Logs a user in based on email and password and returns the id 
router.post("/login", (req: Request, res: Response) => { userController.logInUser(req, res); }); 


export default router; 

