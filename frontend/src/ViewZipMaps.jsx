import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import omnivore from "@mapbox/leaflet-omnivore";

let mapInstance = null;

const ViewZipMaps = ({ kmlFiles }) => {
  useEffect(() => {
    if (!kmlFiles || kmlFiles.length === 0) return;

    if (mapInstance) {
      mapInstance.off();
      mapInstance.remove();
    }

    mapInstance = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance);

    const group = L.featureGroup();
    let loadedCount = 0;

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    kmlFiles.forEach((file) => {
      const color = getRandomColor();

      const customLayer = L.geoJSON(null, {
        // ✅ Only show polygons/multipolygons (ignores overlays, etc.)
        filter: function (feature) {
          return (
            feature.geometry &&
            (feature.geometry.type === "Polygon" ||
              feature.geometry.type === "MultiPolygon")
          );
        },
        style: {
          color: "black", // Border color
          weight: 2, // Border thickness
          fillColor: color, // Fill color (unique)
          fillOpacity: 0.3, // Solid fill like first image
        },
      });

      omnivore
        .kml(file, null, customLayer)
        .on("ready", function () {
          group.addLayer(this);
          loadedCount++;

          if (loadedCount === kmlFiles.length) {
            group.addTo(mapInstance);
            const bounds = group.getBounds();
            if (bounds.isValid()) {
              mapInstance.fitBounds(bounds, {
                padding: [20, 20],
                maxZoom: 17,
              });
            } else {
              mapInstance.setView([20.5937, 78.9629], 5);
            }
          }
        })
        .on("error", function (err) {
          console.error("Error loading KML:", err);
        });
    });
  }, [kmlFiles]);

  return (
    <div
      id="map"
      style={{ height: "500px", width: "100%", marginTop: "20px" }}
    ></div>
  );
};

export default ViewZipMaps;
