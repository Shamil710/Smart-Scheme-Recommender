//

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const stored = authService.getStoredUser();
      const token = authService.getToken();

      if (stored && token) {
        // Optimistically set user from storage first (instant UI)
        setUser(stored);
        try {
          const res = await authService.getProfile();
          if (res.success) {
            const fresh = res.data?.user || res.data;
            setUser(fresh);
            localStorage.setItem("govscheme_user", JSON.stringify(fresh));
          }
        } catch {
          // Token expired or invalid — clear everything
          authService.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    // authService.login already saves token + user to localStorage
    const res = await authService.login(credentials);
    // res is always { success: true, data: { token, user } } from our fixed service
    setUser(res.data.user);
    toast.success(`Welcome back, ${res.data.user?.name || "User"}!`);
    return res;
  };

  const register = async (data) => {
    try {
      const res = await authService.register(data);
      if (res.success) {
        toast.success("Account created! Please log in.");
      } else {
        toast.error(res.message || "Registration failed");
      }
      return res;
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateUser = (updated) => {
    setUser(updated);
    localStorage.setItem("govscheme_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAdmin: user?.role?.trim() === "admin",
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
