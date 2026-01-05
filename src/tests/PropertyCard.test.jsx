import React from "react";
import { render, screen } from "@testing-library/react";
import PropertyCard from "../components/PropertyCard";

describe("PropertyCard component", () => {
  test("renders property information correctly", () => {
    const property = {
      type: "House",
      location: "London",
      price: 250000,
      bedrooms: 3,
      picture: "/test.jpg",
      dateAdded: "2023",
    };

    render(<PropertyCard property={property} />);

    expect(screen.getByText("House")).toBeInTheDocument();
    expect(screen.getByText("3 bedrooms")).toBeInTheDocument();
    expect(screen.getByText("£250,000")).toBeInTheDocument();
  });
});
