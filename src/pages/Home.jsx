import React from "react";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Product from "../components/Product";

export default function Home(){
  return (
    <>
      <Hero />

      <section id="about" className="py-5 section-muted">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Freshly roasted coffee, daily</h2>
              <p className="mb-2">
                We carefully select beans, roast in-house, and serve signature drinks with daily baked goods.
              </p>
              <ul className="list-unstyled text-muted mb-0">
                <li>• Espresso / Pour-Over / Cold Brew</li>
                <li>• Fresh bakes — croissant & cakes</li>
                <li>• Fast Wi-Fi and calm work corner</li>
              </ul>
            </div>
            <div className="col-md-6">
              <img
                src={`https://dummyjson.com/image/600x360/5C3A21/f6f0e8?text=${encodeURIComponent("Coffee • Beans • Vibes")}`}
                className="img-fluid rounded-4 shadow-sm"
                alt="Coffee beans and cup"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-5">
        <div className="container">
          <h3 className="mb-3">Photo Menu</h3>
          <p className="text-muted mb-4">Placeholder images from DummyJSON—swap in your real photos anytime.</p>
          <Gallery />
        </div>
      </section>

      <section className="py-5 section-muted">
        <div className="container">
          <h3 className="mb-4">Most Popular — Product Demo</h3>
          <Product />
        </div>
      </section>
    </>
  );
}
