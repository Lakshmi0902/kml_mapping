// import React, { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import omnivore from "@mapbox/leaflet-omnivore";

// const roleOptions = ["ZH", "RH", "ASM", "TSM", "TL", "Distributor", "TSE"];

// const ViewKML = () => {
//   const location = useLocation();
//   const [selectedRole, setSelectedRole] = useState("");
//   const [files, setFiles] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const mapRef = useRef(null);
//   const layerRef = useRef(null);

//   // Auto-select role if passed from another page
//   useEffect(() => {
//     if (location.state?.role) {
//       setSelectedRole(location.state.role);
//     }
//   }, [location.state]);

//   // Fetch sector KML files by role
//   useEffect(() => {
//     if (selectedRole) {
//       axios
//         .get(`http://localhost:5001/api/${selectedRole.toLowerCase()}/files`)
//         .then((res) => setFiles(res.data))
//         .catch((err) => console.error("Fetch error", err));
//     }
//   }, [selectedRole]);

//   // Initialize map
//   const initMap = () => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; OpenStreetMap contributors",
//       }).addTo(mapRef.current);
//     }
//   };

//   const handleView = (filename) => {
//     const kmlUrl = `http://localhost:5001/uploads/${filename}`;
//     setShowMap(true);

//     setTimeout(() => {
//       initMap();

//       if (layerRef.current) {
//         mapRef.current.removeLayer(layerRef.current);
//         layerRef.current = null;
//       }

//       // Generate dark bold random color
//       const getDarkColor = () => {
//         const colors = [
//           "#1f2937", // dark gray
//           "#4b5563", // slate gray
//           "#111827", // charcoal
//           "#0f172a", // dark navy
//           "#dc2626", // deep red
//           "#2563eb", // strong blue
//           "#059669", // dark green
//           "#b91c1c", // deep crimson
//           "#7c3aed", // bold purple
//           "#d97706", // deep orange
//           "#065f46", // forest green
//         ];
//         return colors[Math.floor(Math.random() * colors.length)];
//       };

//       const newLayer = omnivore
//         .kml(kmlUrl)
//         .on("ready", function () {
//           const color = getDarkColor();

//           this.eachLayer(function (layer) {
//             layer.setStyle({
//               color: color,
//               weight: 2,
//               opacity: 1,
//               fillColor: color,
//               fillOpacity: 0.6,
//             });
//           });

//           mapRef.current.fitBounds(this.getBounds());
//         })
//         .on("error", function (error) {
//           console.error("KML load error:", error);
//           alert("Failed to load KML. Check file format.");
//         })
//         .addTo(mapRef.current);

//       layerRef.current = newLayer;
//     }, 100);
//   };

//   return (
//     <div
//       style={{
//         padding: "2rem",
//         backgroundColor: "#87CEEB", // Sky blue
//         minHeight: "100vh",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "1200px",
//           margin: "0 auto",
//           backgroundColor: "#fff",
//           padding: "1.5rem",
//           borderRadius: "10px",
//           boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <h2
//           style={{
//             fontSize: "24px",
//             fontWeight: "bold",
//             marginBottom: "1.5rem",
//             textAlign: "center",
//           }}
//         >
//           View Sector IDs and KML on Map
//         </h2>

//         {/* Container for Select and Table aligned top-left */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start", // Align to top-left
//             gap: "1.5rem",
//             marginBottom: "1.5rem",
//           }}
//         >
//           {/* Dropdown */}
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 fontSize: "18px",
//                 fontWeight: "500",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Select a user type:
//             </label>
//             <select
//               value={selectedRole}
//               onChange={(e) => {
//                 setSelectedRole(e.target.value);
//                 setShowMap(false);
//               }}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "0.5rem",
//                 borderRadius: "6px",
//                 width: "300px",
//                 backgroundColor: "#fff",
//                 color: "#333",
//                 fontSize: "16px",
//                 boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
//               }}
//             >
//               <option value="" disabled>
//                 Select a user type
//               </option>
//               {roleOptions.map((role) => (
//                 <option key={role} value={role}>
//                   {role}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Table */}
//           {files.length > 0 && (
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 textAlign: "center",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//               }}
//             >
//               <thead>
//                 <tr style={{ backgroundColor: "#e5e7eb", color: "#374151" }}>
//                   <th
//                     style={{
//                       padding: "1rem",
//                       border: "1px solid #d1d5db",
//                       fontSize: "18px",
//                     }}
//                   >
//                     Sector ID
//                   </th>
//                   <th
//                     style={{
//                       padding: "1rem",
//                       border: "1px solid #d1d5db",
//                       fontSize: "18px",
//                     }}
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {files.map((file) => (
//                   <tr key={file.id} style={{ backgroundColor: "#fff" }}>
//                     <td
//                       style={{ padding: "1rem", border: "1px solid #e5e7eb" }}
//                     >
//                       {file.sector_id}
//                     </td>
//                     <td
//                       style={{ padding: "1rem", border: "1px solid #e5e7eb" }}
//                     >
//                       <button
//                         onClick={() => handleView(file.kml_file)}
//                         style={{
//                           backgroundColor: "#2563eb",
//                           color: "#fff",
//                           padding: "0.5rem 1rem",
//                           borderRadius: "5px",
//                           border: "none",
//                           cursor: "pointer",
//                         }}
//                       >
//                         View KML
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Map */}
//         {showMap && (
//           <div
//             id="map"
//             style={{
//               height: "500px",
//               width: "100%",
//               borderRadius: "10px",
//               overflow: "hidden",
//               boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewKML;
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import omnivore from "@mapbox/leaflet-omnivore";

const roleOptions = ["ZH", "RH", "ASM", "TSM", "TL", "Distributor", "TSE"];

const ViewKML = () => {
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState("");
  const [files, setFiles] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  // Auto-select role if passed from another page
  useEffect(() => {
    if (location.state?.role) {
      setSelectedRole(location.state.role);
    }
  }, [location.state]);

  // Fetch files based on selected role
  useEffect(() => {
    if (selectedRole) {
      axios
        .get(`http://localhost:5001/api/${selectedRole.toLowerCase()}/files`)
        .then((res) => setFiles(res.data))
        .catch((err) => console.error("Fetch error", err));

      // 🧹 CLEAN UP MAP PROPERLY
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }

      layerRef.current = null;
      setShowMap(false);
      setSelectedSectorId(null);
    }
  }, [selectedRole]);

  // Initialize map
  const initMap = () => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }
  };

  const handleView = (filename, sectorId) => {
    const kmlUrl = `http://localhost:5001/uploads/${filename}`;
    setSelectedSectorId(sectorId);
    setShowMap(true);

    setTimeout(() => {
      initMap();

      // Remove previous KML layer
      if (layerRef.current) {
        mapRef.current.removeLayer(layerRef.current);
        layerRef.current = null;
      }

      const getDarkColor = () => {
        const colors = [
          "#1f2937",
          "#4b5563",
          "#111827",
          "#0f172a",
          "#dc2626",
          "#2563eb",
          "#059669",
          "#b91c1c",
          "#7c3aed",
          "#d97706",
          "#065f46",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      };

      const newLayer = omnivore
        .kml(kmlUrl)
        .on("ready", function () {
          const color = getDarkColor();
          this.eachLayer((layer) => {
            layer.setStyle({
              color: color,
              weight: 2,
              opacity: 1,
              fillColor: color,
              fillOpacity: 0.6,
            });
          });
          mapRef.current.fitBounds(this.getBounds());
        })
        .on("error", (error) => {
          console.error("KML load error:", error);
          alert("Failed to load KML. Check file format.");
        })
        .addTo(mapRef.current);

      layerRef.current = newLayer;
    }, 100);
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#e0f2fe",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          View Sector ID and KML Map
        </h2>

        {/* Dropdown */}
        <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
          <label
            style={{ fontSize: "18px", fontWeight: "500", marginRight: "10px" }}
          >
            Select a user type:
          </label>
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setFiles([]);
              setShowMap(false);
              setSelectedSectorId(null);

              // Remove previous KML layer
              if (layerRef.current && mapRef.current) {
                mapRef.current.removeLayer(layerRef.current);
                layerRef.current = null;
              }

              // Optional: clear any other non-tile layers
              if (mapRef.current) {
                mapRef.current.eachLayer((layer) => {
                  if (!(layer instanceof L.TileLayer)) {
                    mapRef.current.removeLayer(layer);
                  }
                });
              }
            }}
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              width: "250px",
              fontSize: "16px",
              border: "1px solid #ccc",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <option value="" disabled>
              Select user type
            </option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        {files.length > 0 && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "1.5rem",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e5e7eb", color: "#374151" }}>
                <th
                  style={{
                    padding: "1rem",
                    border: "1px solid #d1d5db",
                    fontSize: "18px",
                  }}
                >
                  Sector ID
                </th>
                <th
                  style={{
                    padding: "1rem",
                    border: "1px solid #d1d5db",
                    fontSize: "18px",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} style={{ backgroundColor: "#fff" }}>
                  <td style={{ padding: "1rem", border: "1px solid #e5e7eb" }}>
                    {file.sector_id}
                  </td>
                  <td style={{ padding: "1rem", border: "1px solid #e5e7eb" }}>
                    <button
                      onClick={() => handleView(file.kml_file, file.sector_id)}
                      style={{
                        backgroundColor: "#2563eb",
                        color: "#fff",
                        padding: "0.5rem 1rem",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      View KML
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Map and Sector ID Display */}
        {showMap && (
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Selected Sector ID:{" "}
              <span style={{ color: "#2563eb" }}>{selectedSectorId}</span>
            </h3>
            <div
              id="map"
              style={{
                height: "500px",
                width: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewKML;
