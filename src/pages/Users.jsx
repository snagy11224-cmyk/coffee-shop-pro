import React from "react";
import UsersList from "../components/UsersList";

export default function Users(){
  return (
    <section className="py-5">
      <div className="container">
        <h3 className="mb-3">Users</h3>
        <UsersList />
      </div>
    </section>
  );
}
