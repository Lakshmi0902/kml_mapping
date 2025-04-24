import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate credentials (optional: add backend auth here)
    // if (employeeID && password) {
    //   navigate("/kml-dashboard");
    // } else {
    //   alert("Please enter both Employee ID and Password");
    // }
    if (employeeID && password) {
      // Save flag to localStorage
      localStorage.setItem("isAuthenticated", "true");

      // Navigate to dashboard
      navigate("/kml-dashboard");
    }
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#87CEEB",
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    width: "320px",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    textAlign: "center",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.25rem",
    borderRadius: "0.25rem",
    border: "1px solid #ccc",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#2563eb", // blue-600
    color: "white",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1d4ed8", // blue-700
  };

  return (
    <div style={containerStyle}>
      <form
        onSubmit={handleSubmit}
        style={formStyle}
        onMouseOver={(e) => {
          const btn = e.currentTarget.querySelector("button");
          btn.style.backgroundColor = buttonHoverStyle.backgroundColor;
        }}
        onMouseOut={(e) => {
          const btn = e.currentTarget.querySelector("button");
          btn.style.backgroundColor = buttonStyle.backgroundColor;
        }}
      >
        <h2 style={headingStyle}>Sign In</h2>

        <label style={labelStyle}>
          Employee ID:
          <input
            type="text"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            style={inputStyle}
            required
          />
        </label>

        <label style={labelStyle}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
