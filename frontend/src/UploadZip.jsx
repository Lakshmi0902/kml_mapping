import React, { useState } from "react";
import axios from "axios";
import ViewZipMaps from "./ViewZipMaps";

const UploadZip = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [zipFile, setZipFile] = useState(null);
  const [kmlFiles, setKmlFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/zip") {
      setZipFile(file);
    } else {
      alert("Please upload a ZIP file.");
    }
  };

  const handleUpload = async () => {
    if (!state || !district || !zipFile) {
      alert("Please fill in all fields and select a ZIP file.");
      return;
    }

    const formData = new FormData();
    formData.append("state", state);
    formData.append("district", district);
    formData.append("zipFile", zipFile);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5001/upload-zip",
        formData
      );
      const data = res.data;
      setLoading(false);
      alert("ZIP file uploaded successfully!");

      if (data.extractedKmlFiles && data.extractedKmlFiles.length > 0) {
        setKmlFiles(data.extractedKmlFiles);
      } else {
        console.log("No KML files returned:", data);
      }
    } catch (err) {
      setLoading(false);
      console.error("Upload failed", err);
      alert("Upload failed. Check backend.");
    }
  };

  const styles = {
    page: {
      backgroundColor: "#87CEEB",
      minHeight: "100vh",
      padding: "3rem 1rem",
      fontFamily: "Segoe UI, sans-serif",
    },

    card: {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: "2rem",
      width: "90%",
      maxWidth: "800px",
      minHeight: "500px",
      margin: "2rem auto",
    },

    heading: {
      fontSize: "1.75rem",
      marginBottom: "1.5rem",
      color: "#333",
      textAlign: "center",
    },
    formGroup: {
      marginBottom: "1.25rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "600",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "0.65rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "6px",
      backgroundColor: "#f9f9f9",
    },
    select: {
      width: "100%",
      padding: "0.65rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "6px",
      backgroundColor: "#f9f9f9",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#007BFF",
      color: "#fff",
      fontSize: "1.05rem",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "1rem",
    },
    loading: {
      marginTop: "1.2rem",
      textAlign: "center",
      color: "#555",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Upload ZIP File</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={styles.select}
          >
            <option value="">Select a state</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>District</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter district"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>ZIP File</label>
          <input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>

        <button onClick={handleUpload} style={styles.button}>
          Upload
        </button>

        {loading && <div style={styles.loading}>Uploading...</div>}
        {!loading && kmlFiles.length > 0 && <ViewZipMaps kmlFiles={kmlFiles} />}
      </div>
    </div>
  );
};

export default UploadZip;
