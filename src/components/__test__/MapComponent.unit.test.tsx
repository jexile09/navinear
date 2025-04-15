/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import MapComponent from "../MapComponent";

// ---------------------------------------------------
// Mock entire @mappedin/react-sdk module
// ---------------------------------------------------
vi.mock("@mappedin/react-sdk", () => ({
  // Simulate the Mappedin MapView component
  MapView: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,

  // Simulate the label rendering on map
  Label: ({ text }: { text: string }) => <span>{text}</span>,

  // Return mock map data: 2 rooms
  useMapData: () => ({
    isLoading: false,
    error: null,
    mapData: {
      getByType: () => [
        { id: "1", name: "Room A", center: [0, 0] },
        { id: "2", name: "Room B", center: [0, 0] },
      ],
      getDirections: async () => "mocked-directions",
    },
  }),

  // Return mock spaces for labels on the map
  useMap: () => ({
    mapData: {
      getByType: () => [
        { id: "1", name: "Room A", center: [0, 0] },
        { id: "2", name: "Room B", center: [0, 0] },
      ],
    },
  }),
}));

// ---------------------------------------------------
//  Unit Test
// ---------------------------------------------------
test("renders form controls and Find Path button", async () => {
  render(<MapComponent />);

  // Asserts that the 'Select Start Location' dropdown is rendered
  expect(await screen.findByText("Select Start Location")).toBeInTheDocument();

  // Asserts that the 'Select Destination' dropdown is rendered
  expect(screen.getByText("Select Destination")).toBeInTheDocument();

  // Asserts that the "Find Path" button is present in the UI
  expect(screen.getByRole("button", { name: /Find Path/i })).toBeInTheDocument();
});
