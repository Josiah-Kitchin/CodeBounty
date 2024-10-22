import { Router } from 'express';
import UserController from '../controllers/userController.js';
const router = Router();
const userController = new UserController();
//Create a new user request 
router.post('/users', (req, res) => { userController.addUser(req, res); });
//Get a user's name by id
router.get('/users/:id', (req, res) => { userController.getUserNameById(req, res); });
export default router;
