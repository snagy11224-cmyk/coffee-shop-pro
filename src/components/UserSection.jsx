// src/components/UsersSection.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../api/users";

export default function UsersSection() {
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => listUsers({ page, pageSize }),
    keepPreviousData: true,
    staleTime: 60_000,
  });

  const total = data?.total || 0;
  const items = data?.items || [];
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section id="users" className="py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="mb-0">Users</h3>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {isLoading && <div className="alert alert-info">Loading users...</div>}
        {isError && (
          <div className="alert alert-danger">
            {error?.message || "Failed to load users"}
          </div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <div className="alert alert-warning">No users found.</div>
        )}

        <div className="row g-3">
          {items.map((u) => (
            <div key={u.id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={u.image || "https://dummyjson.com/icon/abc123/120"}
                  className="card-img-top"
                  alt={`${u.firstName} ${u.lastName}`}
                  loading="lazy"
                  height="200"
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <div className="fw-semibold">
                    {u.firstName} {u.lastName}
                  </div>
                  <div className="text-muted small">{u.email}</div>
                  <div className="badge bg-light text-dark mt-2">
                    {u.gender} • {u.age}y
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex align-items-center justify-content-between mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isFetching}
          >
            ← Prev
          </button>

          <span className="text-muted">
            Page {page} / {totalPages} (Total: {total})
          </span>

          <button
            className="btn btn-outline-primary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isFetching}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
