
import React, { useState, FormEvent } from "react";
import axiosInstance from "../axios.config";
import { Profile } from "./interfaces";
import "./styles/projectUpload.css";


interface EditProfileCardProps {
    profile: Profile,
    onSave: () => void
}

const EditProfileCard: React.FC<EditProfileCardProps> = ({ profile, onSave}) => {
    const [newProfile, setNewProfile] = useState<Profile>({ ...profile});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddInterest = (interest: string) => {
        if (!newProfile.interests.includes(interest)) {
            setNewProfile(prev => ({
                ...prev, 
                interests: [...prev.interests, interest]
            })); 
        }
    };

    const handleRemoveInterest = (interest: string) => {
        setNewProfile(prev => ({
            ...prev, 
            interests: prev.interests.filter(i => i !== interest)
        }));
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.put("/profiles", newProfile);
            console.log(response.data.message);
            onSave(); 
        } catch (err: any) {
            console.log(err);
            setError("Failed to save changes");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-field">
            <label>
                Interests:
                <input
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            const value = e.currentTarget.value.trim();
                            if (value) {
                                handleAddInterest(value);
                                e.currentTarget.value = ""; // Clear the input
                            }
                        }
                    }}
                />
            </label>
            <div className="tag-container">
                {newProfile.interests.map((interest, index) => (
                    <span key={index} className="tag">
                        {interest}{" "}
                        <button
                            type="button"
                            onClick={() => handleRemoveInterest(interest)}
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Saving..." : "Save"}
        </button>
    </form>
    );
}

export default EditProfileCard; 
