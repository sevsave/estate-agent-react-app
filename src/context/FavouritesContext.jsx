import { createContext, useState } from "react";

// Create the context
export const FavouritesContext = createContext();

// Provider component
export function FavouritesProvider({ children }) {
  // Favourites array (note: uppercase "Favourites" to match your PropertyPage)
  const [Favourites, setFavourites] = useState([]);

  // Function to add a property to favourites
  const addFavourites = (property) => {
    // Check if the property is already in favourites
    const exists = Favourites.find((fav) => fav.id === property.id);
    if (!exists) {
      setFavourites([...Favourites, property]);
    }
  };

  // Function to remove a property from favourites
  const removeFavourites = (id) => {
    setFavourites(Favourites.filter((fav) => fav.id !== id));
  };

  // Function to clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{ Favourites, addFavourites, removeFavourites, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
