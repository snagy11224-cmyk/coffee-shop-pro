// src/api/dummy.js
const BASE = "https://dummyjson.com";

export async function getUsers(page = 1, limit = 8) {
  const skip = (page - 1) * limit;
  const res = await fetch(`${BASE}/users?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to load users");
  const data = await res.json(); // { users: [...], total, limit, skip }
  return { items: data.users, total: data.total, limit, page };
}
