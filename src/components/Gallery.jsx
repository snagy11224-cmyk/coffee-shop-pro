import React from "react";

const items = [
  { label: "Latte", img: "/latte.jpg" },
  { label: "Cappuccino", img: "/capuccino.jpg" },
  { label: "Espresso", img: "/espresso.jpg" },
  { label: "Mocha", img: "/mocca.jpg" },
  { label: "Cold Brew", img: "/cold brew.jpeg" },
  { label: "Croissant", img: "/croissant.jpg" },
  { label: "Brownie", img: "/brownie.jpg" },
  { label: "Cheesecake", img: "/cheesecake.jpg" },
];

export default function Gallery(){
  return (
    <div className="row g-4">
      {items.map(({ label, img }, idx) => (
        <div key={idx} className="col-6 col-md-4 col-lg-3">
          <div className="card shadow-sm h-100">
            <img
              src={img}
              className="card-img-top"
              alt={label}
              loading="lazy"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h6 className="card-title mb-0">{label}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
