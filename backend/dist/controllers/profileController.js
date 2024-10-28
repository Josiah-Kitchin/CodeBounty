/* --------- The user controller file handles requests for operations on the UserModel -------- */
import ProfileModel from '../models/profileModel.js';
import { ensureError } from '../utils/errors.js';
class ProfileController {
    /* The profile controller class handles the business logic of profile operations
     * in prescence of a request. Each method is meant to be called by the router in userRoutes
     *
     * ---- Parameters ----
    * req: Incoming Request to the API, what kind of data depends on the route
    * res: Sets the response to the requester
    
     * ---- Methods -----
    * addProfile
        * Takes a post request to add a profile with the profile data.
        * Is meant to only be used at the creation of account. Further modifications to a
        * profile will be via updateProfile
     */
    model;
    constructor() {
        this.model = new ProfileModel();
    }
    async addProfile(req, res) {
        try {
            req.body.preferences = JSON.stringify(req.body.preferences);
            await this.model.add(req.body);
            return res.status(201).json({ message: "Profile Created" });
        }
        catch (e) {
            const error = ensureError(e);
            return res.status(400).json({ error: error.message });
        }
    }
}
export default ProfileController;
