import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/headers.css';
function Headers() {
    return (
        <header className="header">
            <nav className="header-nav">
                <Link to="/" className="header-link">Home</Link>
                <Link to="/login" className="header-link">Login</Link>
                <Link to="/register" className="header-link">Register</Link>
                <Link to='/connection' className="header-link">Connection</Link>
            </nav>
        </header>
    );
}

export default Headers;
