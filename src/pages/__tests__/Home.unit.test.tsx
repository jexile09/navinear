// src/pages/__tests__/Home.unit.test.tsx
/// <reference types="vitest/globals" />
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

describe("Home Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test("displays welcome message and subtitle", () => {
    expect(screen.getByText("Welcome to NaviNear")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your go-to solution for seamless navigation inside UToledo's North Engineering building/i
      )
    ).toBeInTheDocument();
  });

  test("displays navigation buttons", () => {
    expect(screen.getByRole("button", { name: "Explore Maps" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Office Hours" })).toBeInTheDocument();
  });

  test("renders image carousel with buttons", () => {
    expect(screen.getByAltText("Slide")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "‹" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "›" })).toBeInTheDocument();
  });

  test("carousel next/prev button updates image index", async () => {
    const nextButton = screen.getByRole("button", { name: "›" });
    const prevButton = screen.getByRole("button", { name: "‹" });
  
    // Wait for initial image to render
    const imageBefore = await screen.findByAltText("Slide") as HTMLImageElement;
    const initialSrc = imageBefore.src;
  
    // Click next and wait for DOM update
    fireEvent.click(nextButton);
    const imageAfterNext = await screen.findByAltText("Slide") as HTMLImageElement;
    expect(imageAfterNext.src).not.toBe(initialSrc);
  
    // Click prev and wait for DOM update
    fireEvent.click(prevButton);
    const imageAfterPrev = await screen.findByAltText("Slide") as HTMLImageElement;
    expect(imageAfterPrev.src).toBe(initialSrc);
  });  
});
