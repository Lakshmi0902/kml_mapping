import React from "react";

const HelpPage = () => {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.header}>KML Mapping - User Guide</h1>
      <p style={styles.text}>
        Welcome to the KML Mapping User Guide. This guide will walk you through
        how to upload, view, and manage your KML files and ZIP archives. Follow
        the steps below to get started.
      </p>

      {/* Upload KML Section */}
      <h3 style={styles.subHeader}>Uploading KML Files</h3>
      <p style={styles.text}>To upload a KML file, follow these steps:</p>
      <ol style={styles.text}>
        <li>Select the "Upload KML" option from the dashboard.</li>
        <li>
          Choose your role (ZH, RH, TL, etc.) from the dropdown menu. Each role
          requires different data entry, so ensure the correct option is
          selected.
        </li>
        <li>
          Fill in the necessary data fields, such as location, sector, and any
          other required details specific to your role.
        </li>
        <li>
          Once the data is filled in, click "Upload" to select and upload the
          KML file(s).
        </li>
        <li>
          After the upload is complete, you will be able to view your KML file
          on the map.
        </li>
      </ol>

      {/* View KML Section */}
      <h3 style={styles.subHeader}>Viewing KML Files</h3>
      <p style={styles.text}>To view your uploaded KML files:</p>
      <ol style={styles.text}>
        <li>Select the "View KML" option from the dashboard.</li>
        <li>
          Choose the user type (ZH, RH, TL, etc.) from the dropdown menu. This
          will display the KML files associated with that user type.
        </li>
        <li>
          Click on the KML file you wish to view. The file will be displayed on
          the map, and you can interact with it.
        </li>
      </ol>

      {/* Upload ZIP Section */}
      <h3 style={styles.subHeader}>Uploading ZIP Files</h3>
      <p style={styles.text}>
        If you have multiple KML files in a ZIP archive, you can upload the
        entire ZIP file for easier management:
      </p>
      <ol style={styles.text}>
        <li>Select the "Manage ZIP Files" option from the dashboard.</li>
        <li>
          Choose the state and district for which you are uploading the ZIP
          file.
        </li>
        <li>Upload the ZIP file containing the KML files.</li>
        <li>
          Once uploaded, the KML files inside the ZIP will be available for
          viewing on the map.
        </li>
      </ol>

      {/* Button to navigate back to Dashboard */}
      <button onClick={() => window.history.back()} style={styles.button}>
        Back to Dashboard
      </button>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "#f7fafc",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
  },
  header: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "24px",
    color: "#1e40af",
    marginTop: "30px",
  },
  text: {
    fontSize: "16px",
    color: "#4b5563",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#1e40af",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "30px",
  },
};

export default HelpPage;
