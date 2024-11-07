import React from 'react';
import ProjectCard from '../components/projectCard';


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

  // Handle card click, possibly navigate or show more details
  const handleCardClick = (projectId: number) => {
    console.log(`Project ${projectId} clicked!`);
    // Implement navigation to project details or other actions
  };

  return (
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
  );
};

export default Dashboard;
