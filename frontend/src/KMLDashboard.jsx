import React, { useState } from "react";
import {
  FaFileUpload,
  FaEye,
  FaArchive,
  FaSearch,
  FaMoon,
  FaSun,
  FaQuestionCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const KMLDashboard = ({ isDarkTheme }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null); // <-- Hover state

  // Sample list of files for demonstration
  const files = ["Upload KML", "View KML", "Upload ZIP"];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter files based on search query
    if (query) {
      const results = files.filter((file) =>
        file.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFiles(results);
    } else {
      setFilteredFiles([]);
    }
  };

  const handleFileClick = (fileName) => {
    if (fileName === "Upload KML") {
      navigate("/upload-kml");
    } else if (fileName === "View KML") {
      navigate("/view-kml");
    } else if (fileName === "Upload ZIP") {
      navigate("/upload-zip");
    }
  };

  const handleHelpClick = () => {
    navigate("/help");
  };

  const colors = {
    bgGradient: isDarkTheme
      ? "linear-gradient(to right, #1a202c, #2d3748)"
      : "linear-gradient(to right, #ebf8ff, #e0f2fe)",
    cardBg: isDarkTheme ? "#2d3748" : "#ffffff",
    text: isDarkTheme ? "#e2e8f0" : "#1e3a8a",
    subtext: isDarkTheme ? "#cbd5e0" : "#475569",
    iconColor: isDarkTheme ? "#90cdf4" : "#1e40af",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: colors.bgGradient,
        fontFamily: "Segoe UI, sans-serif",
        transition: "background 0.4s ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header with Search Bar and Help Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "10px",
            }}
          >
            🚀 KML Mapping Dashboard
          </h1>
          <p style={{ color: colors.subtext, fontSize: "16px" }}>
            Upload, view, and manage KML & ZIP files in one place.
          </p>
        </div>

        {/* Search Bar and Help Button */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: "10px",
              borderRadius: "20px",
              border: `1px solid ${isDarkTheme ? "#4a5568" : "#cbd5e0"}`,
              width: "250px",
              marginRight: "10px",
            }}
          />
          <button
            onClick={() => {}}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "20px",
              cursor: "pointer",
              border: "none",
              marginRight: "15px",
            }}
          >
            <FaSearch />
          </button>

          {/* Help Button */}
          <button
            onClick={handleHelpClick}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "20px",
              cursor: "pointer",
              border: "none",
            }}
          >
            <FaQuestionCircle />
          </button>
        </div>
      </div>

      {/* Display Search Results */}
      {filteredFiles.length > 0 && (
        <div
          style={{
            backgroundColor: colors.cardBg,
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 12px 25px rgba(0, 0, 0, 0.1)",
            marginBottom: "40px",
          }}
        >
          <h3
            style={{
              color: colors.text,
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Search Results:
          </h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {filteredFiles.map((file, idx) => (
              <li
                key={idx}
                onClick={() => handleFileClick(file)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  color: colors.text,
                  fontSize: "18px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
                onMouseLeave={(e) => (e.target.style.color = colors.text)}
              >
                {file}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "30px",
        }}
      >
        {[
          {
            icon: <FaFileUpload size={50} color={colors.iconColor} />,
            title: "Upload KML",
            desc: "Easily upload new KML files to visualize geodata.",
            action: () => navigate("/upload-kml"),
          },
          {
            icon: <FaEye size={50} color={colors.iconColor} />,
            title: "View KML",
            desc: "Browse and interact with your uploaded KML files.",
            action: () => navigate("/view-kml"),
          },
          {
            icon: <FaArchive size={50} color={colors.iconColor} />,
            title: "Manage ZIP Files",
            desc: "Upload ZIPs containing multiple KMLs and manage them.",
            action: () => navigate("/upload-zip"),
          },
        ].map((card, idx) => (
          <div
            key={idx}
            onClick={card.action}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: colors.cardBg,
              padding: "25px",
              borderRadius: "16px",
              boxShadow:
                hoveredCard === idx
                  ? "0 20px 35px rgba(0, 0, 0, 0.2)"
                  : "0 12px 25px rgba(0, 0, 0, 0.1)",
              transform:
                hoveredCard === idx ? "translateY(-5px)" : "translateY(0)",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <div style={{ marginBottom: "15px" }}>{card.icon}</div>
            <h3
              style={{
                color: colors.text,
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              {card.title}
            </h3>
            <p style={{ color: colors.subtext, fontSize: "15px" }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "60px",
          textAlign: "center",
          fontSize: "14px",
          color: colors.subtext,
          paddingBottom: "10px",
        }}
      >
        &copy; 2025 KML Mapping Dashboard. All rights reserved.
      </div>
    </div>
  );
};

export default KMLDashboard;
