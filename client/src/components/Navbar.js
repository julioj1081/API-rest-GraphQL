import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav className="navbar navbar-expand bg-primary py-1 shadow-sm" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to={"/"}>MessageList</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to={"/new-message"}>Nuevo mensaje</Link>
                </div>
            </div>
        </nav>

        
    )
}