

import React, { useState, useEffect } from 'react';
import axiosInstance from "../axios.config";
import NavBar from "../components/nav";
import ProjectCard from '../components/projectCard';
import { Project } from '../components/interfaces';
import ProjectUpload from '../components/projectUpload';
import "./styles/page.css";
import "./styles/shared.css"

const MyProjectsPage: React.FC = () => {
    const [myProjects, setMyProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyProjects = async () => {
            try {
                const userId = localStorage.getItem("id");
                const response = await axiosInstance.get("/projects/byuser/" + userId);
                console.log("sent request for my projects");
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
            <h1>Upload Project</h1>
            <ProjectUpload />
          </div>
        </div>
      </div>
    </div>
    );
}

export default MyProjectsPage; 
