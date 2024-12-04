import React, { useState, useEffect } from "react";
import LargeProjectCard from "../components/largeProjectCard";
import NavBar from "../components/nav";
import "./styles/page.css";
import "./styles/shared.css";
import axiosInstance from "../axios.config";
import { useLocation } from 'react-router-dom';



const SingleProject: React.FC = () => {
    const location = useLocation();
    const { state } = location;

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProjectById = async () => {
            try {
                const response = await axiosInstance.get("/projects/byproject/" + state.id);
                const project = response.data.project;  
                setProject(project);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        getProjectById(); 
    }, []);

    return (
        <div className="dashboard-layout">
            <NavBar />
            { loading ? (
                <div className="spinner"></div>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <div className="main-content">
                    <div className="dashboard-container">
                        <div className="projects-container">
                            <LargeProjectCard project={project} />
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default SingleProject;