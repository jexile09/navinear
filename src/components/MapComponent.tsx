// src/components/MapComponent.tsx
// Import required hooks and components
import { useState, useEffect } from "react"; // React hooks to manage component state and effects
import Select, { StylesConfig } from "react-select"; // Custom dropdowns
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk"; // Mappedin SDK components to show the map and data.
import "@mappedin/react-sdk/lib/esm/index.css"; // Mappedin styles
import "./MapComponent.css"; // Custom CSS for the map

// Type for dropdown select options
interface OptionType {
  label: string;
  value: string;
}

// Navigation API interface provided by Mappedin
interface NavigationAPI {
  draw: (directions: unknown) => void;
}

// Custom map view type for accessing the Navigation API
interface CustomMapView {
  Navigation: NavigationAPI;
}

// Component for labeling all spaces (rooms) on the map
function MyCustomComponent() {
  const { mapData } = useMap();
  return (
    <>
      {/* Loop through all spaces and render a label for each */}
      {mapData?.getByType("space")?.map((space) => (
        <Label key={space.id} target={space.center} text={space.name} />
      ))}
    </>
  );
}

// Custom styles for the react-select dropdown
const customStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({ ...base, backgroundColor: "white", color: "black" }),
  menu: (base) => ({ ...base, backgroundColor: "white", color: "black" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#e2e8f0" : "white",
    color: "black",
  }),
  singleValue: (base) => ({ ...base, color: "black" }),
  input: (base) => ({ ...base, color: "black" }),
  placeholder: (base) => ({ ...base, color: "gray" }),
};

// Main map component
export default function MapComponent() {
  // Load map data using Mappedin API credentials
  const { isLoading, error, mapData } = useMapData({
    key: "ADD KEY HERE",
    secret: "ADD SECRET HERE",
    mapId: "ADD MAP ID"
  });

  // State variables
  const [mapView, setMapView] = useState<CustomMapView | null>(null); // Mappedin MapView instance
  const [startLocation, setStartLocation] = useState<OptionType | null>(null); // Selected start location
  const [endLocation, setEndLocation] = useState<OptionType | null>(null); // Selected destination
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen toggle

  // Get all spaces (rooms) from the map data
  const allSpaces = mapData?.getByType("space") ?? [];

  // Convert spaces into dropdown format
  const spaceOptions: OptionType[] = allSpaces
    .filter((space) => space.name?.trim()) // Ensure the space has a name
    .map((space) => ({ label: space.name, value: space.name }));

  // Find and draw the navigation path between selected locations
  const handleFindPath = async () => {
    if (!mapData || !mapView || !startLocation || !endLocation) return;
    const start = allSpaces.find((s) => s.name === startLocation.value);
    const end = allSpaces.find((s) => s.name === endLocation.value);
    if (start && end) {
      const directions = await mapData.getDirections(start, end);
      mapView.Navigation.draw(directions); // Draw the path on the map
    }
  };

  // Disable background scroll when in fullscreen mode
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "auto";
  }, [isFullscreen]);

  // Handle loading or error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // Render map and form when map data is available
  return mapData ? (
    <div className={`map-container ${isFullscreen ? "fullscreen-mode" : ""}`}>
      {/* Show dropdowns and button only when not in fullscreen */}
      {!isFullscreen && (
        <div className="map-content-wrapper">
          <div className="form-controls">
            {/* Dropdown to select start location */}
            <Select
              options={spaceOptions}
              value={startLocation}
              onChange={(option) => setStartLocation(option)}
              placeholder="Select Start Location"
              isSearchable
              styles={customStyles}
              className="select-box"
            />
            {/* Dropdown to select destination */}
            <Select
              options={spaceOptions}
              value={endLocation}
              onChange={(option) => setEndLocation(option)}
              placeholder="Select Destination"
              isSearchable
              styles={customStyles}
              className="select-box"
            />
            {/* Button to find path */}
            <button onClick={handleFindPath} className="find-path-button">
              Find Path
            </button>
          </div>
        </div>
      )}

      {/* Map viewer container with dynamic fullscreen styling */}
      <div
        className="map-view"
        onClick={() => setIsFullscreen(true)} // Enable fullscreen on click
        style={{
          height: isFullscreen ? "100vh" : "70vh",
          width: isFullscreen ? "100vw" : "100%",
          position: isFullscreen ? "fixed" : "relative",
          top: isFullscreen ? 0 : undefined,
          left: isFullscreen ? 0 : undefined,
          zIndex: isFullscreen ? 9999 : undefined,
          borderRadius: isFullscreen ? 0 : "20px",
        }}
      >
        {/* Show exit button only in fullscreen mode */}
        {isFullscreen && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from bubbling
              setIsFullscreen(false); // Exit fullscreen
            }}
            className="exit-fullscreen"
          >
            ✕
          </button>
        )}
        {/* Render Mappedin interactive map */}
        <MapView
          mapData={mapData}
          style={{ height: "100%", width: "100%" }}
          onLoad={(instance) => setMapView(instance as CustomMapView)} // Store map instance
        >
          {/* Add dynamic space labels to the map */}
          <MyCustomComponent />
        </MapView>
      </div>
    </div>
  ) : null; // If mapData is not loaded, render nothing
}

