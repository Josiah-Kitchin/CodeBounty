import React from 'react';
import './styles/projectCard.css';
import { Project } from './interfaces.js'


interface LargeProjectCardProps {
  project: Project | null,
}

const LargeProjectCard: React.FC<LargeProjectCardProps> = ({ project }) => {
  const visitRepo = (repoLink: string | undefined) => {
    if (repoLink) {
        window.open(repoLink, '_blank'); // Opens the link in a new tab
      } else {
        alert('No repo link available for this project');
      }
  }


  return (
    <div className="large-project-card">
      <div className="large-project-card-header">
        <h2 className="large-project-card-title">{project?.title}</h2>
      </div>
      <div className="large-project-card-body">
        <p className="large-project-card-description">{project?.description}</p>
        <p className="large-project-card-tags">{`#${project?.tags}`}</p>
        <button className="repo-button" onClick={() => visitRepo(project?.link)}>Repo</button>  
      </div>
    </div>
  );
};

export default LargeProjectCard;
