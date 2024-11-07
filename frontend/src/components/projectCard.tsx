import React from 'react';
import './styles/projectCard.css';


// Define the prop types for the ProjectCard component
interface ProjectCardProps {
  title: string;
  description: string;
  image?: string; // Optional image prop
  onClick?: () => void; // Optional click handler
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-header">
        {image && <img src={image} alt={title} className="project-card-image" />}
        <h2 className="project-card-title">{title}</h2>
      </div>
      <div className="project-card-body">
        <p className="project-card-description">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
