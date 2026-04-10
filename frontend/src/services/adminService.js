import api from "./api";

export const adminService = {
  async getAllSchemes() {
    const res = await api.get("/admin/schemes");
    return res.data;
  },

  async getSchemeById(id) {
    const res = await api.get(`/admin/scheme/${id}`);
    return res.data;
  },

  async addScheme(data) {
    const res = await api.post("/admin/add-scheme", data);
    return res.data;
  },

  async updateScheme(id, data) {
    const res = await api.patch(`/admin/update-scheme/${id}`, data);
    return res.data;
  },

  async deleteScheme(id) {
    const res = await api.delete(`/admin/delete-scheme/${id}`);
    return res.data;
  },
};
