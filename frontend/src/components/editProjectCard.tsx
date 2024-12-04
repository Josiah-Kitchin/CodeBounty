
import React, { useState } from "react";
import { Project } from "./interfaces";
import axiosInstance from "../axios.config";

interface EditProjectCardProps {
    project: Project,
    onSave: () => void;
}

const EditProjectCard: React.FC<EditProjectCardProps> = ({ project, onSave }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [projectData, setProjectData] = useState({ ...project });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.put("/projects", projectData);
            console.log(response.data.message);
            onSave();
        } catch (e: any) {
            console.log(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTag = (tag: string) => {
        if (!projectData.tags.includes(tag)) {
            setProjectData((prev) => ({
                ...prev,
                tags: [...prev.tags, tag],
            }));
        }
    };

    const handleRemoveTag = (tag: string) => {
        setProjectData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-field">
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={projectData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className="form-field">
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className="form-field">
                <label>
                    Repo Link:
                    <input
                        type="text"
                        name="link"
                        value={projectData.link}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className="form-field">
                <label>
                    Tags:
                    <input
                        type="text"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value.trim();
                                if (value) {
                                    handleAddTag(value);
                                    e.currentTarget.value = ""; // Clear input
                                }
                            }
                        }}
                    />
                </label>
                <div className="tag-container">
                    {projectData.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}{" "}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </button>
        </form>
    );
};

export default EditProjectCard; 