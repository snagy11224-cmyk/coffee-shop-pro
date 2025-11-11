import React, { useMemo, useState } from "react";

const initial = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};

  // Name
  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  // Email
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else {
    const emailRx =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRx.test(values.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
  }

  // Message
  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please write at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(null);

  const errors = useMemo(() => validate(form), [form]);
  const isValid = useMemo(
    () =>
      Object.keys(errors).length === 0 &&
      form.name && form.email && form.message,
    [errors, form]
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErr(null);
    setSent(false);
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isValid) return; // block submit if invalid

    try {
      setLoading(true);
      setErr(null);
      setSent(false);

      // Simulated success
      await new Promise((r) => setTimeout(r, 600));
      setSent(true);
      setForm(initial);
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reqStar = (
    <>
      <span className="text-danger ms-1" aria-hidden="true">*</span>
      <span className="visually-hidden"> (required)</span>
    </>
  );

  return (
    <div className="row">
      <div className="col-lg-8">
        {sent && (
          <div className="alert alert-success">
            Your message was sent! We’ll reply soon.
          </div>
        )}
        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={onSubmit} className="card shadow-sm p-4" noValidate>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name{reqStar}
            </label>
            <input
              id="name"
              name="name"
              className={`form-control ${
                touched.name && errors.name ? "is-invalid" : ""
              }`}
              value={form.name}
              onChange={onChange}
              onBlur={onBlur}
              required
              aria-invalid={!!(touched.name && errors.name)}
              aria-describedby="nameHelp"
            />
            <div id="nameHelp" className="invalid-feedback">
              {touched.name && errors.name}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email{reqStar}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${
                touched.email && errors.email ? "is-invalid" : ""
              }`}
              value={form.email}
              onChange={onChange}
              onBlur={onBlur}
              required
              aria-invalid={!!(touched.email && errors.email)}
              aria-describedby="emailHelp"
              inputMode="email"
              autoComplete="email"
            />
            <div id="emailHelp" className="invalid-feedback">
              {touched.email && errors.email}
            </div>
          </div>

          {/* Message */}
          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              Message{reqStar}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className={`form-control ${
                touched.message && errors.message ? "is-invalid" : ""
              }`}
              value={form.message}
              onChange={onChange}
              onBlur={onBlur}
              required
              aria-invalid={!!(touched.message && errors.message)}
              aria-describedby="messageHelp"
            />
            <div id="messageHelp" className="invalid-feedback">
              {touched.message && errors.message}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              disabled={loading || !isValid}
              aria-disabled={loading || !isValid}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
