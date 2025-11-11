import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./layout/Footer";
import CartButton from "./components/CartButton.";

// Pages
import Home from "./pages/Home";
import Users from "./pages/Users";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <Header />
      <CartButton />      
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/contact" element={<Contact />} />
              {/* 404 */}
            <Route path="*" element={
            <section className="py-5">
              <div className="container">
                <h3 className="fw-bold mb-2">Page not found</h3>
                <p className="text-muted">Please check the URL.</p>
              </div>
            </section>
            }/>

        </Routes>
      </main>

      <Footer />

    </>
  );
}