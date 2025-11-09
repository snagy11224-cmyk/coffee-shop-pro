import React from "react";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-5 section-muted">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="mb-0">Contact & Reservations</h3>
          <a href="#contact" className="btn btn-primary d-none d-md-inline-flex">Reserve a Table</a>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
