// src/pages/Maps.tsx
import MapComponent from "../components/MapComponent"; // Import the main map interface component
import "./Maps.css"; // Import styles specific to the Maps page

// Maps page component
const Maps = () => {
  return (
    // Page container with full height, UToledo blue background, and white text
    <div className="min-h-screen bg-[#00274C] text-white px-6 py-10">
      
      {/* Section containing the page title and description */}
      <section className="max-w-3xl mx-auto mb-6 text-left">
        <h2 className="map-title">Campus Maps</h2>
        <p className="map-subtitle">
          Use the dropdowns below to select a start and destination location on campus and view the navigation path.
        </p>
      </section>

      {/* Interactive map component with dropdowns and pathfinding */}
      <MapComponent />
    </div>
  );
};

export default Maps; // Export the component for use in routing
