import { Router } from 'express';
import UserController from '../controllers/userController.js';
import authorizeToken from '../middlewares/authorize.js';
const router = Router();
const userController = new UserController();
//Create a new user post request 
router.post('/', (req, res) => { userController.addUser(req, res); });
//Get a user's name by id
router.get('/name/:id', authorizeToken, (req, res) => { userController.getUserNameById(req, res); });
//Get a user's email by id'
router.get('/email/:id', authorizeToken, (req, res) => { userController.getUserEmailById(req, res); });
//Update the user data with new data 
router.put("/:id", authorizeToken, (req, res) => { userController.updateUser(req, res); });
//Delete the users data based on id 
router.delete("/:id", authorizeToken, (req, res) => { userController.deleteUser(req, res); });
//Logs a user in based on email and password and returns the id 
router.post("/login", (req, res) => { userController.logInUser(req, res); });
export default router;
