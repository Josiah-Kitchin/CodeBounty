
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";

const NavBar: React.FC = () => {
    const navigate = useNavigate(); 
    const isDashboard = useMatch("/dashboard");
    const isMyProjects = useMatch("/myProjects");
    const isMyProfile = useMatch("/myProfile");

    return (
        <div className="sidebar">
            <button onClick={() => !isDashboard ? navigate("/dashboard") : navigate("")}>Dashboard</button>
            <button onClick={() => !isMyProjects? navigate("/myProjects") : navigate("")}>My Projects</button>
            <button onClick={() => !isMyProfile? navigate("/myProfile") : navigate("")}>My Profile</button>
        </div>
    ); 
}


export default NavBar; 