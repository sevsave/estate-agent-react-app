import { createContext, useState } from "react";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  
  const [favourites, setFavourites] = useState([]);

  const addFavourites = (property) => {
    
    const exists = favourites.find((fav) => fav.id === property.id);
    if (!exists) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourites = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourites, removeFavourites, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
