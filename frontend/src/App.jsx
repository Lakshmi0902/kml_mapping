import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import KMLDashboard from "./KMLDashboard";
import ProtectedRoute from "./ProtectedRoute";
import RoleForm from "./RoleForm";
import ViewKML from "./ViewKML";
import UploadZip from "./UploadZip";
import ViewZipMaps from "./ViewZipMaps";
import Layout from "./components/Layout";
import HelpPage from "./HelpPage"; // Import the HelpPage component
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />

        {/* Protected Layout Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/kml-dashboard" element={<KMLDashboard />} />
          <Route path="/upload-kml" element={<RoleForm />} />
          <Route path="/view-kml" element={<ViewKML />} />
          <Route path="/upload-zip" element={<UploadZip />} />
          <Route path="/view-zip-maps" element={<ViewZipMaps />} />
          {/* Add HelpPage Route */}
          <Route path="/help" element={<HelpPage />} />{" "}
          {/* New HelpPage route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
