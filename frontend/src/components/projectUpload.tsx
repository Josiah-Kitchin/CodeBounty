
import React, { useState, FormEvent } from 'react';
import axiosInstance from "../axios.config";
import "./styles/projectUpload.css";

interface ProjectUploadProps {
    onUpload: () => void
}

const ProjectUpload: React.FC<ProjectUploadProps> = ({ onUpload }) => {
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        link: "",
        tags: [] as string[]
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post("/projects", projectData);
            console.log(response.data.message);
            setProjectData({
                title: "",
                description: "",
                link: "",
                tags: [] as string[]
            });
            onUpload()
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const handleAddTag = (tag: string) => {
        if (!projectData.tags.includes(tag)) {
            setProjectData((prev) => ({
                ...prev,
                tags: [...prev.tags, tag], // Append the new tag
            }));
        }
    };

    const handleRemoveTag = (tag: string) => {
        setProjectData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag), // Remove the tag
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
                    <input
                        type="text"
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
                                    e.currentTarget.value = ""; // Clear the input
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
                                style={{ marginLeft: "4px" }}
                            >
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
        </form>
    );
};


export default ProjectUpload;

