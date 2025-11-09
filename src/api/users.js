// src/api/users.js
import api from "./apiClient";

// DummyJSON بيستخدم limit و skip
export const listUsers = async ({ page = 1, pageSize = 8 } = {}) => {
  const skip = (page - 1) * pageSize;
  const res = await api.get("/users", { params: { limit: pageSize, skip } });
  // شكل الرد: { users: [...], total: 200, skip, limit }
  return {
    items: res.data.users || [],
    total: res.data.total || 0,
    page,
    pageSize,
  };
};
