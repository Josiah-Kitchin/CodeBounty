import { Router } from 'express';
import ProfileController from '../controllers/profileController.js';
const router = Router();
const profileController = new ProfileController();
//Create a new profile (used only at the time of account creation)
router.post('/', (req, res) => { profileController.addProfile(req, res); });
export default router;
