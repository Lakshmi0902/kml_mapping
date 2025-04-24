import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DistributorForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    state: "",
    district_sector_id: "",
    district_name: "",
    requested_by: "",
    kml_file: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "kml_file") {
      setFormData({ ...formData, kml_file: e.target.files[0] });
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
      const res = await axios.post(
        "http://localhost:5001/api/distributor",
        payload
      );
      alert("Distributor data uploaded successfully!");
      navigate("/view-kml", { state: { role: "Distributor" } });
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
        name="district_sector_id"
        placeholder="District Sector ID"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="text"
        name="district_name"
        placeholder="District Name"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="text"
        name="requested_by"
        placeholder="Requested By"
        onChange={handleChange}
        required
        style={styles.input}
      />
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

export default DistributorForm;
