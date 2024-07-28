import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <header className='header'>
            <Link to="/" className='logo'>CineGuide</Link>

            <button onClick={handleSearchClick} className='search-button'>
                <section className='search-wrapper'>
                    <FaSearch />
                    <span>Search</span>
                </section>
            </button>

            {/* <Link to="/login" className='login'>Login</Link> */}
        </header>
    );
}

export default Navbar;
