// src/components/Header.jsx
import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { MessageOfTheDayButton } from "./MessageOfTheDayButton";

export default function Header() {
  const { pathname, hash } = useLocation();

  // Active rules:
  const homeActive  = pathname === "/" && (!hash || hash === "#hero");
  const aboutActive = pathname === "/" && hash === "#about";
  const menuActive  = pathname === "/" && hash === "#menu";

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">OurCoffeShop</Link>

        <button
          className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#mainNav"
          aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto gap-2">
            {/* Home: only active on "/" or "#hero" */}
            <li className="nav-item">
              <NavHashLink smooth to="/#hero" className={`nav-link${homeActive ? " active" : ""}`}>
                Home
              </NavHashLink>
            </li>

            {/* Normal routes use NavLink with end */}
            <li className="nav-item">
              <NavLink to="/users" end className={({isActive}) => `nav-link${isActive ? " active" : ""}`}>
                Order Contacts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" end className={({isActive}) => `nav-link${isActive ? " active" : ""}`}>
                Contact
              </NavLink>
            </li>
          </ul>

         <MessageOfTheDayButton className="btn-coffee ms-lg-3" />
        </div>
      </div>
    </nav>
  );
}
