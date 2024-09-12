import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Navbar = ({ user, handleLogout }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleSearchClick = () => {
        navigate('/search');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <header className='header'>
            <Link to="/" className='logo'>CineGuide</Link>

            <button onClick={handleSearchClick} className='search-button'>
                <section className='search-wrapper'>
                    <FaSearch />
                    <span>Search</span>
                </section>
            </button>

            {user ? (
                <div className="user-info" ref={dropdownRef}>
                    <button onClick={toggleDropdown} className='login-button'>
                        {user.username.length > 10 ? user.username.slice(0, 10) + '...' : user.username}
                    </button>

                    {showDropdown && (
                        <div className="dropdown-menu">
                            <ul>
                                <li className='dropdown-items'><Link to="./profile">View Profile</Link></li>
                                <li className='dropdown-items'><Link to="./lists">View Lists</Link></li>
                                <li className='dropdown-items'><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <button onClick={handleLoginClick} className='login-button'>Login</button>
            )}
        </header>
    );
}

export default Navbar;
