import React from 'react';
import './styles/projectCard.css';
import { Project } from './interfaces.js'


interface ProjectCardProps {
  project: Project,
  onClick: () => void
}


const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-header">
        <h2 className="project-card-title">{project.title}</h2>
      </div>
      <div className="project-card-body">
        <p className="project-card-description">{project.description}</p>
        <p className="project-card-tags">{`#${project.tags}`}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
