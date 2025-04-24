import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-omnivore";

const ViewMap = ({ kmlFile }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const getDarkRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      const digit = letters[Math.floor(Math.random() * 12)]; // 0 to B = darker colors
      color += digit;
    }
    return color;
  };

  useEffect(() => {
    if (!kmlFile) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const customColor = getDarkRandomColor();

    const geoLayer = L.geoJSON(null, {
      filter: function (feature) {
        return (
          feature.geometry &&
          (feature.geometry.type === "Polygon" ||
            feature.geometry.type === "MultiPolygon")
        );
      },
      style: () => ({
        color: "black",
        weight: 2,
        fillColor: customColor,
        fillOpacity: 0.6, // better visibility
      }),
    });

    const kmlLayer = window.omnivore
      .kml(`http://localhost:5001/uploads/${kmlFile}`, null, geoLayer)
      .on("ready", function () {
        map.addLayer(this); // <- important to add the parsed layer, not geoLayer
        const bounds = this.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20], maxZoom: 16 });
        }
      })
      .on("error", function (e) {
        console.error("Error loading KML:", e);
      });

    return () => {
      map.remove();
    };
  }, [kmlFile]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Map Preview</h3>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default ViewMap;
