

import React, { useState, useEffect } from 'react';
import axiosInstance from "../axios.config";
import NavBar from "../components/nav";
import ProjectCard from '../components/projectCard';
import { Project } from '../components/interfaces';
import "./styles/page.css";
import "./styles/shared.css"

const MyProfile: React.FC = () => {
    const [myProjects, setMyProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyProjects = async () => {
            try {
                const userId = localStorage.getItem("id");
                const response = await axiosInstance.get("/profiles/byuser/" + userId);
                setMyProjects(response.data.projects);
            } catch (e: any) {
                console.log(e);
                setError(e);
            } finally {
              setLoading(false);
            }
        }
        fetchMyProjects(); 
    }, []);

    return (

    <div className="dashboard-layout">
      <NavBar />
      <div className="main-content">
        <div className="dashboard-container">
          { /* If it is loading, show loading. If error, show error. Otherwise, display the projects */  
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

              </>
            )
          }
          <div> 
            <h1>Post Project</h1>
          </div>
        </div>
      </div>
    </div>
    );
}

export default MyProfile; 
