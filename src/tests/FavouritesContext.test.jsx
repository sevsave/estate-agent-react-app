import React from "react";
import { renderHook, act } from "@testing-library/react";
import { FavouritesProvider, FavouritesContext } from "../context/FavouritesContext";

describe("FavouritesContext", () => {
  const wrapper = ({ children }) => (
    <FavouritesProvider>{children}</FavouritesProvider>
  );

  test("adds a property to favourites", () => {
    const { result } = renderHook(
      () => React.useContext(FavouritesContext),
      { wrapper }
    );

    act(() => {
      result.current.addFavourites({ id: "prop1", type: "House" });
    });

    expect(result.current.favourites.length).toBe(1);
  });

  test("removes a property from favourites", () => {
    const { result } = renderHook(
      () => React.useContext(FavouritesContext),
      { wrapper }
    );

    act(() => {
      result.current.addFavourites({ id: "prop1" });
      result.current.removeFavourites("prop1");
    });

    expect(result.current.favourites.length).toBe(0);
  });
});
