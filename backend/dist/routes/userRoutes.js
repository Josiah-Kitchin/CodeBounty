import { Router } from 'express';
import UserModel from '../models/userModel.js';
const router = Router();
const userModel = new UserModel();
//Create a new user request 
router.post('/api/users', async (req, res) => {
    try {
        await userModel.create(req.body);
        return res.status(201).json({ message: "User Created" });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
//Get a user's name by id
router.get('/api/users/:id/name', async (req, res) => {
    try {
        const id = req.params.id; // Get the ID from the route parameters
        const userName = await userModel.getNameById(id);
        return res.status(200).json({ name: userName });
    }
    catch (error) {
        if (error.message == "User Not Found") {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
    }
});
export default router;
