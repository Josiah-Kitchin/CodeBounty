
import React, { useState } from "react";
import { Project } from "./interfaces";
import "./styles/editProjectPopup.css";
import axiosInstance from "../axios.config";
import { useNavigate } from "react-router-dom";

interface EditProjectProps {
    project: Project | null, 
    isOpen: boolean,
    onClose: () => void 
    onDelete: () => void
}
const EditProjectPopup: React.FC<EditProjectProps> = ({ project, isOpen, onClose, onDelete }) => {
    const navigate = useNavigate(); 
    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null; 

    const onEditClick = (project: Project | null) => {
      navigate("/editProject", { state: { project: project} });
    }

    const onDeleteClick = async (project: Project | null) => {
        setDeleteLoading(true);
        try { 
            const response = await axiosInstance.delete("/projects/" + project?.project_id);
            console.log(response.data.message);
            onClose(); 
            onDelete(); 
        } catch (err: any) {
            console.log(err);
            setError(err);
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close-btn" onClick={onClose}>
            &times;
          </button>
          {error ? ( <p> An error occured. Please try again </p>) : (null)}
          <div className="popup-actions">
            <button className="popup-edit-btn" onClick={() => onEditClick(project)}>
              {editLoading ? "Loading..." : "Edit"}
            </button>
            <button className="popup-delete-btn" onClick={() => onDeleteClick(project)}>
              {deleteLoading ? "Deleting..." : "Delete"} 
            </button>
          </div>
        </div>
      </div>
    );
}   

export default EditProjectPopup;
