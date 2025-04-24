import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TSEForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    state: "",
    sector_id: "",
    tier: "",
    kml_file: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "kml_file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:5001/api/tse", payload);
      alert("TSE data uploaded successfully!");
      navigate("/view-kml", { state: { role: "TSE" } });
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      width: "300px",
    },
    input: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    select: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="text"
        name="sector_id"
        placeholder="Sector ID"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <select
        name="tier"
        value={formData.tier}
        onChange={handleChange}
        required
        style={styles.select}
      >
        <option value="">-- Select Tier --</option>
        <option value="tier1">Tier 1</option>
        <option value="tier2">Tier 2</option>
        <option value="tier3">Tier 3</option>
      </select>
      <input
        type="file"
        name="kml_file"
        accept=".kml"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default TSEForm;
