import React from "react"; 
import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { Link } from "react-router-dom";
import './FavouritesList.css';
import { useDroppable, useDraggable } from "@dnd-kit/core";

function DraggableFavourite({ property, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: property.id, 
  });

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="draggable-favourite">
      {children}
    </div>
  );
}

function FavouritesList() {
  const { favourites, removeFavourites, clearFavourites } =
    useContext(FavouritesContext);
  const { setNodeRef, isOver } = useDroppable({ id: "favourites" });  

  return (
    <div
      ref={setNodeRef}
      className={`favourites-list ${isOver ? "over" : ""}`}
    >


    
      <h3>My Favourites</h3>


      {favourites.length === 0 && <p>No favourites added yet.</p>}

      {favourites.map((property) => (
        <DraggableFavourite key={property.id} property={property}>
          <div className="favourite-item">
            <Link to={`/property/${property.id}`}>
              <strong>{property.type}</strong> – £{property.price.toLocaleString()}
            </Link>

          <button
            onClick={() => removeFavourites(property.id)}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
          </div>
        </DraggableFavourite>  
        
      ))}

      {favourites.length > 0 && (
        <button onClick={clearFavourites} style={{ marginTop: "10px" }}>
          Clear Favourites
        </button>
      )}
    </div>
    
  );
}

export default FavouritesList;
