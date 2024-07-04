// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <header className='header'>
            <a href="/" className='logo'>Logo</a>


            <button onClick={handleSearchClick} className='search-button'>
                <section className='search-wrapper'>
                    <FaSearch />
                    <span>Search</span>
                </section>
            </button>


            {/* <a href="/" className='login'>Login</a> */}
        </header>
    );
}

export default Navbar;
