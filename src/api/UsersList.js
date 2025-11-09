import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/users";

export default function UsersList() {
  const [page, setPage] = useState(1);
  const pageSize = 8; // عدّلها براحتك
  const [data, setData] = useState({ users: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr(null);

    fetchUsers({ page, pageSize })
      .then((d) => {
        if (!mounted) return;
        setData(d); // d: { users, total, limit, skip }
      })
      .catch((e) => {
        if (!mounted) return;
        setErr(e?.message || "Error fetching users");
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [page]);

  const totalPages = Math.ceil((data.total || 0) / pageSize);

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex align-items-center mb-3">
          <h3 className="mb-0">Users</h3>
          <span className="ms-2 text-muted">({data.total} total)</span>
        </div>

        {loading && <div>Loading...</div>}
        {err && <div className="alert alert-danger">{err}</div>}

        {!loading && !err && (
          <>
            <div className="row g-3">
              {data.users.map((u) => (
                <div key={u.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <div className="fw-bold">
                        {u.firstName} {u.lastName}
                      </div>
                      <div className="text-muted small">{u.email}</div>
                      <div className="small mt-2">
                        {u.gender} — {u.age} yrs
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              <div>
                Page {page} / {totalPages || 1}
              </div>

              <button
                className="btn btn-outline-secondary"
                onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
