import React from "react";

export default function Footer(){
  return (
    <footer className="py-4 border-top">
      <div className="container d-flex justify-content-between flex-wrap gap-3">
        <div>© {new Date().getFullYear()} MyReactSite</div>
        <ul className="nav">
          <li className="nav-item"><a href="#hero" className="nav-link px-2 text-muted">Home</a></li>
          <li className="nav-item"><a href="#about" className="nav-link px-2 text-muted">About</a></li>
          <li className="nav-item"><a href="#menu" className="nav-link px-2 text-muted">Gallery</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link px-2 text-muted">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
