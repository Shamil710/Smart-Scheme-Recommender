import api from "./api";

export const schemeService = {
  async getAllSchemes(params = {}) {
    const res = await api.get("/schemes", { params });
    return res.data;
  },

  async getSchemeById(id) {
    const res = await api.get(`/schemes/${id}`);
    return res.data;
  },

  async saveScheme(schemeId) {
    const res = await api.post("/schemes/save", {
      scheme_id: schemeId, // ✅ FIXED
    });
    return res.data;
  },

  async getSavedSchemes() {
    const res = await api.get("/schemes/saved");
    return res.data;
  },

  async unsaveScheme(schemeId) {
    const res = await api.delete("/schemes/delete", {
      data: { scheme_id: schemeId },
    });
    return res.data;
  },

  async checkEligibility(params = {}) {
    const res = await api.get("/eligibility/check", { params });
    console.log("CALLING API WITH:", params);
    return res.data;
  },

  async autoCheckEligibility() {
    const res = await api.get("/eligibility/auto");
    return res.data;
  },
};
