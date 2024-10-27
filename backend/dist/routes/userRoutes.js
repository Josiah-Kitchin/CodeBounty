import { Router } from 'express';
import UserController from '../controllers/userController.js';
const router = Router();
const userController = new UserController();
//Create a new user post request 
router.post('/', (req, res) => { userController.addUser(req, res); });
//Get a user's name by id
router.get('/name/:id', (req, res) => { userController.getUserNameById(req, res); });
//Get a user's email by id'
router.get('/email/:id', (req, res) => { userController.getUserEmailById(req, res); });
//Update the user data with new data 
router.put("/:id", (req, res) => { userController.updateUser(req, res); });
//Delete the users data based on id 
router.delete("/:id", (req, res) => { userController.deleteUser(req, res); });
//Logs a user in based on email and password and returns the id 
router.post("/login", (req, res) => { userController.logInUser(req, res); });
export default router;
