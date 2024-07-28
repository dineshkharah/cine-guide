import React from 'react';
import { FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <a href="https://www.linkedin.com/in/dinesh-kharah" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin style={{ fontSize: "1.25rem" }} />
                </a>
                <span> | </span>
                Created by
                <a href="https://github.com/dineshkharah" target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold" }}>
                    Dinesh Kharah
                </a>
                <span> | </span>
                <a href="https://github.com/dineshkharah/movie-review.git" target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold" }}>
                    Source Code
                </a>
            </div>
        </footer>
    );
};

export default Footer;
