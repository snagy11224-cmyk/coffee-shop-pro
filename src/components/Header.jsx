// src/components/Header.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">MyReactSite</Link>

        <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#mainNav"
                aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto gap-2">
            {/* Home should be active ONLY on "/" */}
            <li className="nav-item">
              <NavLink end to="/#hero" className={({isActive}) => `nav-link${isActive ? " active" : ""}`}>
                Home
              </NavLink>
            </li>

            {/* Section links work from any page and get their own active state */}
            <li className="nav-item">
              <NavHashLink
                smooth
                to="/#about"
                className={({isActive}) => `nav-link${isActive ? " active" : ""}`}
              >
                About
              </NavHashLink>
            </li>
            <li className="nav-item">
              <NavHashLink
                smooth
                to="/#menu"
                className={({isActive}) => `nav-link${isActive ? " active" : ""}`}
              >
                Gallery
              </NavHashLink>
            </li>

            <li className="nav-item">
              <NavLink to="/users" className={({isActive}) => `nav-link${isActive ? " active" : ""}`}>
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={({isActive}) => `nav-link${isActive ? " active" : ""}`}>
                Contact
              </NavLink>
            </li>
          </ul>

          <Link to="/contact" className="btn btn-primary ms-lg-3">Reserve a table</Link>
        </div>
      </div>
    </nav>
  );
}
