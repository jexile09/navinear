import { useState } from "react";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";

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

export default function MapComponent() {
  const { isLoading, error, mapData } = useMapData({
    key: "mik_W8fMx1wWJyjevBMlt556607d1",
    secret: "mis_7jP7bMUYKfxM7BRujInCObPv5PvUwnHAk2NzNyIPJFF87fd1018",
    mapId: "67d6048435a08c000b263e28",
  });

  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [mapView, setMapView] = useState<any>(null); // Store the MapView instance

  // Function to find and draw a path between two locations
  const handleFindPath = async () => {
    if (!mapData || !mapView) return;

    // Find start and destination spaces
    const start = mapData
      .getByType("space")
      .find(
        (space) => space.name.toLowerCase() === startLocation.toLowerCase()
      );

    const destination = mapData
      .getByType("space")
      .find((space) => space.name.toLowerCase() === endLocation.toLowerCase());

    if (!start || !destination) {
      alert("Start or End location not found.");
      return;
    }

    try {
      // Fetch navigation path
      const directions = await mapData.getDirections(start, destination);

      if (!directions) {
        alert("Could not retrieve path.");
        return;
      }

      // Draw navigation path on the map
      mapView.Navigation.draw(directions);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return mapData ? (
    <div>
      {/* Input fields for user to enter start and end locations */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Enter start location..."
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="p-2 border rounded-lg w-full mb-2"
        />
        <input
          type="text"
          placeholder="Enter destination..."
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          className="p-2 border rounded-lg w-full mb-2"
        />
        <button
          onClick={handleFindPath}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Find Path
        </button>
      </div>

      {/* Render MapView and store reference to it */}
      <MapView
        mapData={mapData}
        style={{ height: "70vh", width: "100%" }}
        onLoad={(mapInstance) => setMapView(mapInstance)} // Save MapView instance
      >
        <MyCustomComponent />
      </MapView>
    </div>
  ) : null;
}
