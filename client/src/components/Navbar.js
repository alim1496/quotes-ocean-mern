import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss"

const Navbar = () => {
    return (
        <header className="navbar" id="main_navbar">
            <section className="navbar-section">
                <Link to="/" className="navbar-brand mr-2 text-bold">
                    QuotesHub
                </Link>
            </section>
            <section className="navbar-center">
                <Link to="/" className="btn btn-link">
                    Dashboard
                </Link>
                <Link to="/quotes" className="btn btn-link">
                    Quotes
                </Link>
                <Link to="/authors" className="btn btn-link">
                    Authors
                </Link>
                <Link to="/categories" className="btn btn-link">
                    Categories
                </Link>
            </section>
            <section className="navbar-section">
                <button
                    id="btn-logout"
                    className="btn btn-link"
                    onClick={() => {
                        localStorage.removeItem("jwt-token");
                        window.location = "/admin/login";
                    }}
                >
                    Logout
                </button>
            </section>
        </header>
    );
};

export default Navbar;
