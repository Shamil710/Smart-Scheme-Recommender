import api from "./api";

export const schemeService = {
  async getAllSchemes(params = {}, retry = 3) {
    try {
      const res = await api.get("/schemes", { params });
      return res.data;
    } catch (err) {
      if (retry > 0) {
        console.log("Retrying...", retry);
        await new Promise((res) => setTimeout(res, 3000));
        return this.getAllSchemes(params, retry - 1);
      }
      throw err;
    }
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

  async getSavedSchemes(retry = 3) {
    try {
      const res = await api.get("/schemes/saved");
      return res.data;
    } catch (err) {
      if (retry > 0) {
        console.log("Retrying saved schemes...", retry);
        await new Promise((res) => setTimeout(res, 3000));
        return this.getSavedSchemes(retry - 1);
      }
      throw err;
    }
  },

  async unsaveScheme(schemeId) {
    const res = await api.delete("/schemes/delete", {
      data: { scheme_id: schemeId },
    });
    return res.data;
  },
  async checkEligibility(params = {}, retry = 3) {
    try {
      console.log("Calling eligibility API:", params);
      const res = await api.get("/eligibility/check", { params });
      return res.data;
    } catch (err) {
      if (retry > 0) {
        console.log("Retrying eligibility...", retry);
        await new Promise((res) => setTimeout(res, 3000));
        return this.checkEligibility(params, retry - 1);
      }
      throw err;
    }
  },

  async autoCheckEligibility() {
    const res = await api.get("/eligibility/auto");
    return res.data;
  },
};
