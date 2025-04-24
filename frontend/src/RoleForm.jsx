import { useState } from "react";
import ZHForm from "./ZHForm";
import RHForm from "./RHForm";
import ASMForm from "./ASMForm";
import TSMForm from "./TSMForm";
import TLForm from "./TLForm";
import TSEForm from "./TSEForm";
import DistributorForm from "./DistributorForm";

const RoleForm = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const renderForm = () => {
    switch (selectedRole) {
      case "ZH":
        return <ZHForm />;
      case "RH":
        return <RHForm />;
      case "ASM":
        return <ASMForm />;
      case "TSM":
        return <TSMForm />;
      case "TL":
        return <TLForm />;
      case "TSE":
        return <TSEForm />;
      case "Distributor":
        return <DistributorForm />;
      default:
        return null;
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start", // align to top-left
      minHeight: "100vh",
      width: "100vw",
      background: "#d0f0fd",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },

    heading: {
      fontSize: "24px",
      color: "#333",
      fontWeight: "bold",
      marginBottom: "10px",
    },

    select: {
      padding: "10px 16px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #aaa",
      outline: "none",
      backgroundColor: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      cursor: "pointer",
      marginBottom: "30px", // space between dropdown and form
    },

    formWrapper: {
      width: "100%",
      maxWidth: "600px",
      backgroundColor: "#ffffff",
      padding: "25px",
      borderRadius: "10px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Select an Option</h2>
      <select
        value={selectedRole}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">-- Choose an Option --</option>
        <option value="ZH">ZH</option>
        <option value="RH">RH</option>
        <option value="ASM">ASM</option>
        <option value="TSM">TSM</option>
        <option value="TL">TL</option>
        <option value="TSE">TSE</option>
        <option value="Distributor">Distributor</option>
      </select>

      {selectedRole && <div style={styles.formWrapper}>{renderForm()}</div>}
    </div>
  );
};

export default RoleForm;
