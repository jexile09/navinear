// src/components/__tests__/Footer.unit.test.tsx
/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import Footer from "../Footer"; // Import the Footer component

test("renders footer with current year and site name", () => {
  // Render the Footer component
  render(<Footer />);

  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  // Construct the expected footer text
  const footerText = `© ${currentYear} UToledo Indoor Navigation`;

  // Assert that the rendered footer contains the expected text
  expect(screen.getByText(footerText)).toBeInTheDocument();
});
