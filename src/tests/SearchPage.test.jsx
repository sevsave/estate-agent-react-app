import React from "react"; 
import { render, screen, fireEvent } from "@testing-library/react";
import SearchPage from "../pages/SearchPage";
import { BrowserRouter } from "react-router-dom";
import { FavouritesProvider } from "../context/FavouritesContext";

function renderPage() {
  return render(
    <BrowserRouter>
      <FavouritesProvider>
        <SearchPage />
      </FavouritesProvider>
    </BrowserRouter>
  );
}

test("renders search page heading", () => {
  renderPage();
  expect(screen.getByText(/Search Your Property/i)).toBeInTheDocument();
});

test("shows Add to Favourites button", () => {
  renderPage();
  expect(screen.getAllByText(/Add to Favourites/i)[0]).toBeInTheDocument();
});
