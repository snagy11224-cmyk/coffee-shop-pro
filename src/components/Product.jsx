import React, { useState } from "react";

export default function Product(){
  const [qty, setQty] = useState(1);

  const product = {
    name: "Signature Latte",
    desc: "Smooth espresso blended with steamed milk, poured with care for a warm and balanced finish.",
    price: 58, 
    img: "/latte.jpg"
  };

  return (
    <div className="card shadow-sm p-4 border-0 rounded-4" style={{background:"#fff"}}>
      <div className="row align-items-center g-4">
        
        {/* Image */}
        <div className="col-md-4 text-center">
          <img 
            src={product.img} 
            alt={product.name} 
            className="img-fluid rounded-3 shadow-sm" 
            style={{maxHeight:"180px", objectFit:"cover"}}
          />
        </div>

        {/* Text */}
        <div className="col-md-5">
          <h4 className="fw-bold mb-2">{product.name}</h4>
          <p className="text-muted mb-3">{product.desc}</p>
          <div className="fw-semibold" style={{color:"var(--coffee-700)", fontSize:"1.25rem"}}>
            AED {product.price}
          </div>
        </div>

        {/* Controls */}
        <div className="col-md-3 d-flex flex-column align-items-end gap-3">
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-secondary" onClick={()=>setQty(q => Math.max(1,q-1))}>-</button>
            <span className="badge bg-primary px-3 py-2">{qty}</span>
            <button className="btn btn-primary" onClick={()=>setQty(q => q+1)}>+</button>
          </div>
          <button className="btn btn-primary w-100">Add to Order</button>
        </div>

      </div>
    </div>
  );
}
