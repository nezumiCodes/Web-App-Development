import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return(
        <div className="home">
            <nav className="navbar navbar-dark navbar-fixed-top">
                <Link to="/" className="navbar-brand">Todo App</Link>
            </nav>
            <div className="container">
                <h1>Home</h1>
            </div>
        </div>
    )
}