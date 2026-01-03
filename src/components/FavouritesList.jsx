import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { Link } from "react-router-dom";

function FavouritesList() {
  const { Favourites, removeFavourite, clearFavourites } =
    useContext(FavouritesContext);

  return (
    <div className="favourites-list">
      <h3>My Favourites</h3>

      {Favourites.length === 0 && <p>No favourites added yet.</p>}

      {Favourites.map((property) => (
        <div key={property.id} className="favourite-item">
          <Link to={`/property/${property.id}`}>
            <strong>{property.type}</strong> – £
            {property.price.toLocaleString()}
          </Link>

          <button
            onClick={() => removeFavourite(property.id)}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}

      {Favourites.length > 0 && (
        <button onClick={clearFavourites} style={{ marginTop: "10px" }}>
          Clear Favourites
        </button>
      )}
    </div>
  );
}

export default FavouritesList;
