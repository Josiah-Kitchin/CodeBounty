import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/projectCard';
import { Project } from '../components/interfaces';
import "./styles/page.css";
import "./styles/shared.css"
import axiosInstance from "../axios.config";
import NavBar from "../components/nav";
import { useNavigate } from "react-router-dom";



/* The dashboard will be the main page for finding projects, changing pages, etc */
/* ---------------------------------------------------------------------------------------------------- */




const Dashboard: React.FC = () => {

  const [allProjects, setAllProjects] = useState([]); // Store the fetched data
  const [matchedProjects, setMatchedProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store error if there is one
  const [showMatched, setShowMatched] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allResponse = await axiosInstance.get("/projects/all");
        const matchResponse = await axiosInstance.get("/projects/matches");
        setAllProjects(allResponse.data.projects);
        setMatchedProjects(matchResponse.data.projects);
      } catch (err: any) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

  }, []);


  // Handle card click, possibly navigate or show more details
  const getFullProject = (project: Project) => {
    console.log(`Project ${Object.entries(project)} clicked!`);
    navigate("/singleProject", { state: { id: project.project_id} });
    
  }

  const switchProjects = () => {
    setShowMatched(!showMatched);
    setShowAll(!showAll);
  }


  return (
    <>
    <NavBar />
    <button className="switch-projects-btn" onClick={switchProjects}>{showMatched ? "Show All Projects" : "Show Matched Projects"}</button>
    <div className="dashboard-layout">

      <div className="main-content">
        <div className="dashboard-container">
          { /* If it is loading, show loading. If error, show error. Otherwise, display the projects */  
            loading ? (
              <div className="spinner"></div>
            ) : error ? (
              <h2>{error}</h2>
            ) : showMatched ? ( 
              <>
              <div className="projects-container">
                {
                  matchedProjects ? (
                  matchedProjects.map((project: Project) => (
                    <ProjectCard
                      project={project}
                      onClick={() => getFullProject(project)}
                    />
                  ))) : <h2>No Matched Projects</h2>
                }
              </div>
              </>
            ) : (
              <>
              <div className="projects-container">
                {
                  allProjects ? (
                  allProjects.map((project: Project) => (
                    <ProjectCard
                      project={project}
                      onClick={() => getFullProject(project)}
                    />
                  ))) : <h2>No Projects</h2>
                }
              </div>
              </>
            )
          }

        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
