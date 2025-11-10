// src/layout/Footer.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

export default function Footer(){
  return (
    <footer className="py-4 border-top">
      <div className="container d-flex justify-content-between flex-wrap gap-3">
        <div>© {new Date().getFullYear()} CoffeShop</div>
        <ul className="nav">
          <li className="nav-item">
            <NavHashLink smooth to="/#hero" className={({isActive}) => `nav-link px-2${isActive ? " active" : ""}`}>
              Home
            </NavHashLink>
          </li>

          <li className="nav-item">
            <NavHashLink smooth to="/#about" className={({isActive}) => `nav-link px-2${isActive ? " active" : ""}`}>
              About
            </NavHashLink>
          </li>

          <li className="nav-item">
            <NavHashLink smooth to="/#menu" className={({isActive}) => `nav-link px-2${isActive ? " active" : ""}`}>
              Gallery
            </NavHashLink>
          </li>

          <li className="nav-item">
            <NavLink to="/contact" className={({isActive}) => `nav-link px-2${isActive ? " active" : ""}`}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
