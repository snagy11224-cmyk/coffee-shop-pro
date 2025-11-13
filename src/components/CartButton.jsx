// components/CartButton.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "./CartContext";

export default function CartButton() {
  const { items, count, total, inc, dec, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  // امنعي سكرول الصفحة لما البانل مفتوح
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="cart-fab"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
      >
        🛒
        {count > 0 && <span className="cart-badge">{count}</span>}
      </button>

      {open &&
        createPortal(
          <div className="cart-panel-backdrop" onClick={() => setOpen(false)}>
            <div
              className="cart-panel"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Your Cart</h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-muted mb-0">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="list-unstyled cart-list">
                    {items.map((it) => (
                      <li key={it.id} className="cart-line">
                        <img src={it.img} alt="" />
                        <div className="flex-grow-1">
                          <div className="fw-semibold">
                            {it.label}
                            {it.size ? ` – ${it.size}` : ""}
                          </div>
                          <div className="text-muted small">EGP {it.price}</div>
                          <div className="d-flex align-items-center gap-2 mt-1">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => dec(it.id)}
                            >
                              -
                            </button>
                            <span>{it.qty}</span>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => inc(it.id)}
                            >
                              +
                            </button>
                            <button
                              className="btn btn-sm btn-link text-danger ms-2"
                              onClick={() => remove(it.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="fw-semibold">EGP {it.qty * it.price}</div>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="fw-bold">Total: EGP {total}</div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-danger" onClick={clear}>
                        Clear
                      </button>
                      <button className="btn btn-coffee-primary">Checkout</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
