
import React, { useState, useEffect } from 'react';
import "./styles/page.css";
import "./styles/shared.css"
import NavBar from "../components/nav";
import { useNavigate, useLocation } from "react-router-dom";
import EditProjectCard from '../components/editProjectCard';



const EditProject: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { state } = location; 

    return (
        <>
            <NavBar />
            <div className="dashboard-layout">
                <div className="main-content">
                    <div className="dashboard-container">
                        <EditProjectCard onSave={() => navigate("/myProjects")} project={state.project} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProject;





