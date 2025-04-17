// src/components/MapComponent.tsx

import { useState, useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import "./MapComponent.css";

interface OptionType {
  label: string;
  value: string;
}

interface NavigationAPI {
  draw: (directions: unknown) => void;
}

interface CustomMapView {
  Navigation: NavigationAPI;
}

function MyCustomComponent() {
  const { mapData } = useMap();
  return (
    <>
      {mapData?.getByType("space")?.map((space) => (
        <Label key={space.id} target={space.center} text={space.name} />
      ))}
    </>
  );
}

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

export default function MapComponent() {
  const { isLoading, error, mapData } = useMapData({
    key: "mik_W8fMx1wWJyjevBMlt556607d1",
    secret: "mis_7jP7bMUYKfxM7BRujInCObPv5PvUwnHAk2NzNyIPJFF87fd1018",
    mapId: "67d6048435a08c000b263e28",
  });

  const [mapView, setMapView] = useState<CustomMapView | null>(null);
  const [startLocation, setStartLocation] = useState<OptionType | null>(null);
  const [endLocation, setEndLocation] = useState<OptionType | null>(null);
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const allSpaces = mapData?.getByType("space") ?? [];

  const spaceOptions: OptionType[] = allSpaces
    .filter((space) => space.name?.trim())
    .map((space) => ({ label: space.name, value: space.name }));

  const handleFindPath = async () => {
    if (!mapData || !mapView || !startLocation || !endLocation) return;

    const start = allSpaces.find((s) => s.name === startLocation.value);
    const end = allSpaces.find((s) => s.name === endLocation.value);

    if (start && end) {
      try {
        const directions = await mapData.getDirections(start, end, {
          accessible: accessibilityEnabled,
        });

        if (directions) {
          mapView.Navigation.draw(directions);
        } else {
          console.warn("No directions found between the selected points.");
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "auto";
  }, [isFullscreen]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return mapData ? (
    <div className={`map-container ${isFullscreen ? "fullscreen-mode" : ""}`}>
      {!isFullscreen && (
        <div className="map-content-wrapper">
          <div className="form-controls">
            <Select
              options={spaceOptions}
              value={startLocation}
              onChange={(option) => setStartLocation(option)}
              placeholder="Select Start Location"
              isSearchable
              styles={customStyles}
              className="select-box"
            />
            <Select
              options={spaceOptions}
              value={endLocation}
              onChange={(option) => setEndLocation(option)}
              placeholder="Select Destination"
              isSearchable
              styles={customStyles}
              className="select-box"
            />
            <label className="accessibility-checkbox">
              <input
                type="checkbox"
                checked={accessibilityEnabled}
                onChange={(e) => setAccessibilityEnabled(e.target.checked)}
              />
              <span className="checkmark"></span>
              Use accessible route
            </label>
            <button onClick={handleFindPath} className="find-path-button">
              Find Path
            </button>
          </div>
        </div>
      )}
      <div
        className="map-view"
        onClick={() => setIsFullscreen(true)}
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
        {isFullscreen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            className="exit-fullscreen"
          >
            ✕
          </button>
        )}
        <MapView
          mapData={mapData}
          style={{ height: "100%", width: "100%" }}
          onLoad={(instance) => setMapView(instance as CustomMapView)}
        >
          <MyCustomComponent />
        </MapView>
      </div>
    </div>
  ) : null;
}
