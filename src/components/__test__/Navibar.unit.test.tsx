// src/components/__tests__/Navibar.unit.test.tsx
/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navibar from "../Navibar";

test("renders logo and subtitle correctly", () => {
  render(
    <BrowserRouter>
      <Navibar />
    </BrowserRouter>
  );

  // Logo text parts
  expect(screen.getByText("navi")).toBeInTheDocument();
  expect(screen.getByText("NE")).toBeInTheDocument();
  expect(screen.getByText("ar")).toBeInTheDocument();

  // Subtitle text
  expect(screen.getByText("UToledo North Engineering Navigation")).toBeInTheDocument();
});

test("renders navigation links", () => {
  render(
    <BrowserRouter>
      <Navibar />
    </BrowserRouter>
  );

  // Navigation links
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Maps")).toBeInTheDocument();
  expect(screen.getByText("Office Hours")).toBeInTheDocument();
});
