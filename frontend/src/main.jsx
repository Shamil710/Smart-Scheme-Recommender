import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              borderRadius: "12px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: { primary: "#0369a1", secondary: "#fff" },
              style: {
                background: "#f0f9ff",
                color: "#075985",
                border: "1px solid #bae6fd",
              },
            },
            error: {
              style: {
                background: "#fff1f2",
                color: "#be123c",
                border: "1px solid #fecdd3",
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
