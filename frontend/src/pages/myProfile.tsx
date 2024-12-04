
import React, { useState, useEffect } from "react";
import axiosInstance from "../axios.config";
import EditProfileCard from "../components/editProfileCard";
import NavBar from "../components/nav";
import { Profile } from "../components/interfaces";
import "./styles/shared.css";

const MyProfile: React.FC = () => {
    const [profile, setProfile] = useState<Profile>({ interests: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUserInfo = async () => {
        setLoading(true);
        try { 
            const id = localStorage.getItem("id");
            const response = await axiosInstance.get("/profiles/" + id);
            console.log(response.data);
            setProfile({interests: response.data.interests || []});
        } catch(err: any) {
            console.log(err);
            setError("Could not update interests");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <>
            <NavBar />
            <div className="dashboard-layout">
                <div className="main-content">
                    { loading ? (
                        <div className="spinner"></div>
                    ) : error ? (
                        <h2>error</h2>
                    ) : (
                    <div className="dashboard-container">
                        <EditProfileCard onSave={() => console.log("Profile Saved")} profile={profile} />
                    </div>
                    ) }   
                </div>
            </div>
        </>
    );
};

export default MyProfile; 







    



    
