

import React, { useState, useEffect } from 'react';
import axiosInstance from "../axios.config";
import NavBar from "../components/nav";
import ProjectCard from '../components/projectCard';


const MyProfile: React.FC = () => {
    const [username, setUsername] = useState("");
    const [myProjects, setMyProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyProjects = async () => {
            try {
                const userId = localStorage.getItem("id");
                const response = await axiosInstance.get("/profiles/byuser/" + userId);
                setMyProjects(response.data.projects);
                setLoading(false);
            } catch (e: any) {
                setError(e);
            }
        }
        fetchMyProjects(); 
    }, []);

    return (
        <div className="myProfileLayout"> 
            loading ? (
              <div className="spinner"></div>
            ) : error ? (
              <h2>{error}</h2>
            ) : ( 
              <>
              <h1 className="dashboard-title">My Projects</h1>
              <div className="projects-container">
                {
                  myProjects ? (
                  myProjects.map((project: Project) => (
                    <ProjectCard
                      project={project}
                      onClick={() => console.log("clicked")}
                    />
                  ))) : <h2>No Projects</h2>
                }
              </div>

        </div>
    );
}

export default MyProfile; 
