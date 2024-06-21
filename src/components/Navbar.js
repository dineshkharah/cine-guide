import React from 'react'
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    return (
        <header className='header'>
            <a href="/" className='logo'>Logo</a>
            <section className='search-wrapper'>
                <FaSearch className='search-icon' />
                <input type="text" placeholder='Search' className='search-box' />
            </section>
            {/* <a href="/" className='login'>Login</a> */}
        </header>
    )
}

export default Navbar