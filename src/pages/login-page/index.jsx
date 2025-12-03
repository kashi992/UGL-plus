import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Credentials
  const correctAdminUsername = "Northway";
  const correctAdminPassword = "lucid3DG3";
  const correctUsername = "admin";
  const correctPassword = "admin";

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      activeTab === "user" &&
      credentials.username === correctUsername &&
      credentials.password === correctPassword
    ) {
      setError("");
      localStorage.setItem("authToken", "userToken");
      navigate("/home");
    } else if (
      activeTab === "admin" &&
      credentials.username === correctAdminUsername &&
      credentials.password === correctAdminPassword
    ) {
      setError("");
      localStorage.setItem("authToken", "adminToken");
      localStorage.setItem("lastActiveTime", new Date().getTime());
      navigate("/dashboard");
    } else {
      setError("Invalid username or password!");
    }
  };

  useEffect(() => {
    // Clear input fields when LoginForm mounts
    setCredentials({ username: "", password: "" });
    setError("");
  }, []);


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        {/* <div className="tabButtons grid grid-cols-2 mb-4">
          <button
            type="button"  // ✅ prevents form submit on Enter
            className={`tabItem ${activeTab === "user" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("user");
              setCredentials({ username: "", password: "" }); // Clear input fields
              setError("");
            }}
          >
            User
          </button>
          <button
            type="button"  // ✅ prevents form submit on Enter
            className={`tabItem ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("admin");
              setCredentials({ username: "", password: "" }); // Clear input fields
              setError("");
            }}
          >
            Admin
          </button>
        </div> */}
        <h2 className="mb-5">
          {activeTab === "admin" ? "Admin Login" : "User Login"}
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <button className={`primaryClrBg`} type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;