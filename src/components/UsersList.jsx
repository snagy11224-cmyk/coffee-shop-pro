import React, { useEffect, useState } from "react";

const PAGE_SIZE = 10;

export default function UsersList(){
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(()=>{
    const controller = new AbortController();
    const skip = (page - 1) * PAGE_SIZE;

    async function load(){
      try{
        setLoading(true);
        setErr(null);
        const res = await fetch(`https://dummyjson.com/users?limit=${PAGE_SIZE}&skip=${skip}`, {
          signal: controller.signal
        });
        if(!res.ok) throw new Error(`Request failed (${res.status}) — please try again later.`);
        const data = await res.json();
        setItems(data.users || []);
        setTotal(data.total || 0);
      }catch(e){
        if(e.name !== "AbortError") setErr(e.message);
      }finally{
        setLoading(false);
      }
    }
    load();

    return ()=>controller.abort();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {err && <div className="alert alert-danger mb-3">{err}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((u, idx) => (
                    <tr key={u.id}>
                      <td>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                      <td>{`${u.firstName} ${u.lastName}`}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.company?.name || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-muted">
                Page {page} / {totalPages} • Total: {total}
              </div>
              <ul className="pagination mb-0">
                <li className={`page-item ${page===1?'disabled':''}`}>
                  <button className="page-link" onClick={()=>setPage(1)}>« First</button>
                </li>
                <li className={`page-item ${page===1?'disabled':''}`}>
                  <button className="page-link" onClick={()=>setPage(p=>Math.max(1,p-1))}>‹ Prev</button>
                </li>
                <li className="page-item active">
                  <span className="page-link">{page}</span>
                </li>
                <li className={`page-item ${page===totalPages?'disabled':''}`}>
                  <button className="page-link" onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next ›</button>
                </li>
                <li className={`page-item ${page===totalPages?'disabled':''}`}>
                  <button className="page-link" onClick={()=>setPage(totalPages)}>Last »</button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
