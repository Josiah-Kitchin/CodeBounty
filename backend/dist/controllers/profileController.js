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
        /* Add a new profile. The id must be a user id
         * Request -->
            * { ProfileData }
         * Response -->
            * { status }
         */
        try {
            //The middleware turns the json into an object, but we need to store it in json so convert it 
            //back to json 
            req.body.preferences = JSON.stringify(req.body.preferences);
            await this.model.add(req.body);
            return res.status(201).json({ message: "Profile Created" });
        }
        catch (e) {
            const error = ensureError(e);
            return res.status(400).json({ error: error.message });
        }
    }
    async updateProfile(req, res) {
        /* Update a profile
         * Request -->
            * { ProfileUpdateData }
         * Response -->
            * { status }
         */
        try {
            if ('preferences' in req.body) {
                req.body.preferences = JSON.stringify(req.body.preferences);
            }
            await this.model.update(req.body);
            return res.status(201).json({ message: "Profile Updated" });
        }
        catch (e) {
            const error = ensureError(e);
            return res.status(400).json({ error: error.message });
        }
    }
    async getProfileById(req, res) {
        /*  Get a profile by user id
         * Request -->
            * { none }
         * Response -->
            * { ProfileData }
         */
        try {
            const id = Number(req.params.id);
            const profile = await this.model.getProfileById(id);
            return res.status(200).json({ profile: profile });
        }
        catch (e) {
            const error = ensureError(e);
            if (error.message.startsWith("Error getting")) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }
}
export default ProfileController;
