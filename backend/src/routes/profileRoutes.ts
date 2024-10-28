


import { Router, Request, Response } from 'express';
import ProfileController from '../controllers/profileController.js' 

const router = Router(); 
const profileController = new ProfileController();




//Create a new profile (used only at the time of account creation)
router.post('/', (req: Request, res: Response) => { profileController.addProfile(req, res); });   





export default router; 

