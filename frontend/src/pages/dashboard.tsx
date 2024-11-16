import React from 'react';
import ProjectCard from '../components/projectCard';
import { useNavigate } from "react-router-dom";
import "./styles/dashsideboard.css";



/* The dashboard will be the main page for finding projects, changing pages, etc */ 
/* ---------------------------------------------------------------------------------------------------- */



interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
}

const Dashboard: React.FC = () => {
  // Sample data for the projects
  const projects: Project[] = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A description of Project Alpha.',
    },
    {
      id: 2,
      title: 'Project Beta',
      description: 'A description of Project Beta.',
    },
    {
      id: 3,
      title: 'Project Gamma',
      description: 'A description of Project Gamma.',
    },
  ];

  const navigate = useNavigate();

  // Handle card click, possibly navigate or show more details
  const handleCardClick = (projectId: number) => {
    console.log(`Project ${projectId} clicked!`);
    // Implement navigation to project details or other actions
  };

  
  const handleSidebarButtonClick = (button: string) => {
    console.log(`${button} button clicked!`);
    navigate("/createProfile");
    // Implement sidebar actions
  };
  
  return (
    
    //<div className="dashboard-layout">
    //  {/* Sidebar */}
    //  <div className="sidebar">
    //    <h2>Menu</h2>
    //    <button onClick={() => handleSidebarButtonClick('Home')}>My profile1</button>
    //    <button onClick={() => handleSidebarButtonClick('Home')}>My profile2</button>
    //   <button onClick={() => handleSidebarButtonClick('Home')}>My profile3</button>
    //    <button onClick={() => handleSidebarButtonClick('Home')}>My profile4</button>
    //    <button onClick={() => handleSidebarButtonClick('Home')}>My profile5</button>
    //  </div>

    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
      <h2 className="m1">Menu</h2>
        <button onClick={() => handleSidebarButtonClick('Profile')}>My Profile</button>
        <button onClick={() => handleSidebarButtonClick('Settings')}>P1</button>
        <button onClick={() => handleSidebarButtonClick('Projects')}>P2</button>
        <button onClick={() => handleSidebarButtonClick('Logout')}>P3</button>
      </div>
    

    <div className="main-content">
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Projects</h1>

      <div className="projects-container">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            onClick={() => handleCardClick(project.id)}
          />
        ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
