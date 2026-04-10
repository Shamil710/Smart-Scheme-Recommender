import api from "./api";

export const authService = {
  async login(credentials) {
    const res = await api.post("/auth/login", credentials);
    const data = res.data;
    console.log("FULL RESPONSE:", res.data);

    // DEBUG: Remove after confirming structure works
    console.log("🔍 Full login response:", data);

    // SUCCESS CONDITION: token exists
    if (!data.token) {
      throw new Error(data.message || "Login failed");
    }
    // Handle BOTH response shapes safely
    // Shape A: { success, data: { token, user } }  ← nested
    // Shape B: { success, token, user }             ← flat
    const token = data?.data?.token || data?.token || null;
    const user = data?.data?.user || data?.user || null;

    console.log("🔑 Extracted token:", token);
    console.log("👤 Extracted user:", user);

    if (!token) {
      throw new Error("No token received from server. Check backend response.");
    }

    // Persist to localStorage
    localStorage.setItem("govscheme_token", token);
    localStorage.setItem("govscheme_user", JSON.stringify(user));

    console.log(
      "✅ Token saved to localStorage:",
      localStorage.getItem("govscheme_token"),
    );

    // Return normalized shape — always consistent for AuthContext
    return {
      success: true,
      data: { token, user },
    };
  },

  async register(data) {
    const res = await api.post("/auth/register", data);

    console.log("REGISTER RESPONSE:", res.data); // debug

    return {
      success: true, // ✅ force success
      data: res.data,
      message: res.data.message || "Registered successfully",
    };
  },
  async getProfile() {
    const res = await api.get("/auth/profile");
    return res.data;
  },

  async updateProfile(data) {
    const res = await api.put("/auth/profile", data);
    return res.data;
  },

  logout() {
    localStorage.removeItem("govscheme_token");
    localStorage.removeItem("govscheme_user");
  },

  getStoredUser() {
    try {
      const u = localStorage.getItem("govscheme_user");
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem("govscheme_token");
  },
};
