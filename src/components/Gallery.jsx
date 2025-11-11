import React, { useEffect, useMemo, useState } from "react";

const items = [
  // drinks (have sizes)
  { id: 1, label: "Latte",      img: "/latte.jpg",       price: 85,  desc: "Velvety milk + espresso.", sizes: { Small: 0.9, Medium: 1, Large: 1.2 } },
  { id: 2, label: "Cappuccino", img: "/capuccino.jpg",   price: 90,  desc: "Foamy classic with balance.", sizes: { Small: 0.9, Medium: 1, Large: 1.2 } },
  { id: 3, label: "Espresso",   img: "/espresso.jpg",    price: 60,  desc: "Rich single shot.", sizes: { Single: 1, Double: 1.6 } },
  { id: 4, label: "Mocha",      img: "/mocca.jpg",       price: 95,  desc: "Chocolate + espresso.", sizes: { Small: 0.9, Medium: 1, Large: 1.2 } },
  { id: 5, label: "Cold Brew",  img: "/cold brew.jpeg",  price: 100, desc: "Slow-steeped, smooth & chilled.", sizes: { Small: 0.9, Medium: 1, Large: 1.25 } },

  // bakery (no sizes)
  { id: 6, label: "Croissant",  img: "/croissant.jpg",   price: 55,  desc: "Buttery flaky pastry." },
  { id: 7, label: "Brownie",    img: "/brownie.jpg",     price: 45,  desc: "Fudgy cocoa square." },
  { id: 8, label: "Cheesecake", img: "/cheesecake.jpg",  price: 70,  desc: "Creamy NY slice." },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [size, setSize] = useState(null);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // when opening a new item, set default size (first key) if sizes exist
  useEffect(() => {
    if (!selected) return;
    const firstSize = selected.sizes ? Object.keys(selected.sizes)[0] : null;
    setSize(firstSize);
  }, [selected]);

  const finalPrice = useMemo(() => {
    if (!selected) return 0;
    const base = selected.price;
    if (!selected.sizes || !size) return base;
    const multiplier = selected.sizes[size] ?? 1;
    // round to nearest EGP (change to .toFixed(2) if you want decimals)
    return Math.round(base * multiplier);
  }, [selected, size]);

  const open = (item) => setSelected(item);
  const close = () => setSelected(null);

  return (
    <>
      <div className="row g-4">
        {items.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3">
            <div
              className="card shadow-sm h-100 zoom-card cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => open(item)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(item)}
            >
              <img
                src={item.img}
                className="card-img-top"
                alt={item.label}
                loading="lazy"
                style={{ height: 200, objectFit: "cover" }}
              />
              <div className="card-body d-flex justify-content-between align-items-center">
                <h6 className="card-title mb-0">{item.label}</h6>
                <span className="badge bg-primary">
                  EGP {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (controlled via React) */}
      {selected && (
        <div
          className="modal fade show"
          role="dialog"
          aria-modal="true"
          style={{ display: "block", background: "rgba(0,0,0,0.55)" }}
          onClick={close} // click backdrop to close
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selected.label}</h5>
                <button type="button" className="btn-close" onClick={close} />
              </div>

              <div className="modal-body">
                <img
                  src={selected.img}
                  alt={selected.label}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: 260, objectFit: "cover", width: "100%" }}
                />
                <p className="mb-3">{selected.desc}</p>

                <div className="d-flex flex-wrap align-items-center gap-3">
                  {/* Size selector only if item has sizes */}
                  {selected.sizes ? (
                    <>
                      <label className="form-label mb-0">Size</label>
                      <select
                        className="form-select form-select-sm w-auto"
                        value={size ?? ""}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {Object.keys(selected.sizes).map((key) => (
                          <option key={key} value={key}>{key}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <span className="text-muted small">One size</span>
                  )}

                  <span className="ms-auto fs-5 fw-semibold">
                    EGP {finalPrice}
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={close}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
