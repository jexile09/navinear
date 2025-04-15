// src/components/__tests__/Header.unit.test.tsx
/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom"; // Required for <Link>

test("renders UT Indoor Navigation header with navigation links", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Check main heading
  expect(screen.getByText("UT Indoor Navigation")).toBeInTheDocument();

  // Check navigation links
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Maps")).toBeInTheDocument();
  expect(screen.getByText("Office Hours")).toBeInTheDocument();
});

