import React, { useState } from "react";

const initial = { name:"", email:"", message:"" };

export default function ContactForm(){
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(null);

  const onChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErr(null); setSent(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr(null); setSent(false);

    // Simulated success
    await new Promise(r => setTimeout(r, 600));
    setSent(true);
    setForm(initial);
    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        {sent && <div className="alert alert-success">Your message was sent! We’ll reply soon.</div>}
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={onSubmit} className="card shadow-sm p-4" noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">Name</label>
            <input id="name" name="name" className="form-control" value={form.name} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" className="form-control" value={form.message} onChange={onChange} required />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" disabled={loading}>{loading ? "Sending..." : "Send"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
