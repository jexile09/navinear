// src/pages/__tests__/Maps.unit.test.tsx
/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Maps from "../Maps";

// Mock the MapComponent so we don’t load the full map during testing
vi.mock("../../components/MapComponent", () => ({
  default: () => <div data-testid="mocked-map-component">Mocked MapComponent</div>,
}));

describe("Maps Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Maps />
      </BrowserRouter>
    );
  });

  test("renders title and subtitle", () => {
    expect(screen.getByText("Campus Maps")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Use the dropdowns below to select a start and destination location on campus/i
      )
    ).toBeInTheDocument();
  });

  test("renders the MapComponent", () => {
    expect(screen.getByTestId("mocked-map-component")).toBeInTheDocument();
  });
});
