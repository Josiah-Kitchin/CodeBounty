import { Router } from 'express';
import ProfileController from '../controllers/profileController.js';
const router = Router();
const profileController = new ProfileController();
//Create a new profile (used only at the time of account creation)
router.post('/', (req, res) => { profileController.addProfile(req, res); });
//Update a profile with the given data 
router.put('/', (req, res) => { profileController.updateProfile(req, res); });
//Get a profile by their user id 
router.get('/:id', (req, res) => { profileController.getProfileById(req, res); });
export default router;
