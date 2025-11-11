import React from "react";

const items = [
  { label: "welcome", img: "/welcome.avif" }
];


export default function Hero(){
  return (
    <header id="hero" className="py-5 hero-section">
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            
           <h1 className="display-5 fw-bold mb-3">Fresh Coffee, Made With Care</h1>
<p className="lead mb-4">
  From hand-selected beans to slow roasting and smooth pours. Enjoy warm flavors,
  a relaxed atmosphere, and coffee that feels personal.
</p>
<a href="#menu" className="btn btn-light btn-lg me-2" aria-label="Go to menu">Menu</a>
<a href="/contact" className="btn btn-outline-light btn-lg" aria-label="Go to contact">Contact</a>

          </div>
          <div className="col-lg-6 text-center">
           <img
  src={items[0].img}
  className="img-fluid hero-image rounded-4 shadow"
  alt={items[0].label}
  loading="lazy"
  width="520"
  height="320"
/>

          </div>
        </div>
      </div>
    </header>
  );
}
