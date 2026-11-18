import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="not-found--code">404</h1>
            <p className="not-found--message">We could not find that page.</p>
            <Link to="/" className="not-found--link">Back to home</Link>
        </div>
    );
};

export default NotFound;
