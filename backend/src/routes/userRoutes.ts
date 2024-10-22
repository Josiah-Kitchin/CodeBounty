
import { Router, Request, Response } from 'express';
import { createUser, getUserNameById } from '../controllers/userController.js';

const router = Router(); 

//Create a new user request 
router.post('/api/users', createUser);   

//Get a user's name by id
router.get('/api/users/:id/name', getUserNameById); 

export default router; 

