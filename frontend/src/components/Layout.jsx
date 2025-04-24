import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Menu,
  Home,
  CloudUpload,
  Eye,
  FileArchive,
  LogOut,
} from "lucide-react";
import { Sun, Moon } from "lucide-react"; // Correct import for Sun and Moon icons

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Theme state
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Theme Styles
  const themeStyles = {
    sidebarStyle: {
      width: menuOpen ? "220px" : "60px",
      backgroundColor: isDarkTheme ? "#2d3748" : "#e0f7fa", // Dark gray for dark mode, light cyan for light mode
      color: isDarkTheme ? "white" : "#4b5563", // Text color for better contrast
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s ease, background-color 0.3s", // Smooth transition for width and background color
      gap: "1.5rem",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      boxShadow: "2px 0 8px rgba(0, 0, 0, 0.3)",
      zIndex: 10,
    },

    mainContentStyle: {
      marginLeft: menuOpen ? "220px" : "60px",
      padding: "2rem",
      minHeight: "100vh",
      background: isDarkTheme
        ? "linear-gradient(to right, #1a202c, #2d3748)"
        : "linear-gradient(to right, #f0f4f8, #e2e8f0)", // Softer background for light theme
      color: isDarkTheme ? "white" : "black", // Text color for main content
      transition: "margin-left 0.3s ease",
      width: "100%",
    },

    iconStyle: {
      display: "flex",
      alignItems: "center",
      gap: menuOpen ? "10px" : "0",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      padding: "0.5rem",
      borderRadius: "8px",
      position: "relative", // To align tooltips if needed
    },

    iconHover: {
      backgroundColor: isDarkTheme ? "#4a5568" : "#b2ebf2", // Light hover effect on dark and light mode
      color: isDarkTheme ? "white" : "#2d3748", // Change icon color on hover
    },

    activeMenuItem: {
      backgroundColor: isDarkTheme ? "#4a5568" : "#b2ebf2",
      color: isDarkTheme ? "white" : "#2d3748",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: isDarkTheme ? "#2d3748" : "#f0f4f8",
      }}
    >
      {/* Sidebar */}
      <div style={themeStyles.sidebarStyle}>
        <div
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            marginBottom: "1rem",
            fontSize: "1.5rem",
            color: isDarkTheme ? "white" : "#4b5563",
          }}
        >
          <Menu />
        </div>

        <div
          onClick={() => navigate("/kml-dashboard")}
          style={{
            ...themeStyles.iconStyle,
            ...(window.location.pathname === "/kml-dashboard"
              ? themeStyles.activeMenuItem
              : {}),
          }}
        >
          <Home />
          {menuOpen && <span>Home</span>}
        </div>

        <div
          onClick={() => navigate("/upload-kml")}
          style={{
            ...themeStyles.iconStyle,
            ...(window.location.pathname === "/upload-kml"
              ? themeStyles.activeMenuItem
              : {}),
          }}
        >
          <CloudUpload />
          {menuOpen && <span>Upload KML</span>}
        </div>

        <div
          onClick={() => navigate("/view-kml")}
          style={{
            ...themeStyles.iconStyle,
            ...(window.location.pathname === "/view-kml"
              ? themeStyles.activeMenuItem
              : {}),
          }}
        >
          <Eye />
          {menuOpen && <span>View KML</span>}
        </div>

        <div
          onClick={() => navigate("/upload-zip")}
          style={{
            ...themeStyles.iconStyle,
            ...(window.location.pathname === "/upload-zip"
              ? themeStyles.activeMenuItem
              : {}),
          }}
        >
          <FileArchive />
          {menuOpen && <span>Upload ZIP</span>}
        </div>

        {/* Logout Option */}
        <div
          onClick={handleLogout}
          style={{
            ...themeStyles.iconStyle,
            ...(window.location.pathname === "/"
              ? themeStyles.activeMenuItem
              : {}),
          }}
        >
          <LogOut />
          {menuOpen && <span>Logout</span>}
        </div>

        {/* Theme Toggle */}
        <div
          onClick={toggleTheme}
          style={{
            ...themeStyles.iconStyle,
            ...(isDarkTheme ? themeStyles.iconHover : {}),
          }}
        >
          {isDarkTheme ? <Sun /> : <Moon />}{" "}
          {/* Switch between Sun and Moon icons */}
          {menuOpen && <span>{isDarkTheme ? "Light Mode" : "Dark Mode"}</span>}
        </div>
      </div>

      {/* Main Content */}
      <div style={themeStyles.mainContentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
