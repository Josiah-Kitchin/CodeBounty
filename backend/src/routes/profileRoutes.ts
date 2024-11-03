


import { Router, Request, Response } from 'express';
import ProfileController from '../controllers/profileController.js' ;
import authorizeToken from '../middlewares/authorize.js';

const router = Router(); 
const profileController = new ProfileController();




//Create a new profile (used only at the time of account creation)
router.post('/', authorizeToken, (req: Request, res: Response) => { profileController.addProfile(req, res); });   

//Update a profile with the given data 
router.put('/', authorizeToken, (req: Request, res: Response) => { profileController.updateProfile(req, res); });

//Get a profile by their user id 
router.get('/:id', authorizeToken, (req: Request, res: Response) => { profileController.getProfileById(req, res); });





export default router; 

