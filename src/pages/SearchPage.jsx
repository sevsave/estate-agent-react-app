import { DndContext, useDraggable,useDroppable } from "@dnd-kit/core"; 
import { CSS } from "@dnd-kit/utilities";  
import React, { useState,useContext } from "react";
import SearchForm from "../components/SearchForm";
import propertiesData from "../data/properties.json";
import { Link } from "react-router-dom";
import FavouritesList from "../components/FavouritesList";
import { FavouritesContext } from "../context/FavouritesContext";
import './SearchPage.css'; 

function DraggableProperty({ property, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: property.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="draggable-property">
      <div {...listeners} className="drag-handle">
        ⠿ Drag
      </div>
      {children}
    </div>
  );
}

function SearchPage() {
  const [criteria, setCriteria] = useState({});
  const [results, setResults] = useState(propertiesData.properties);
  const { favourites, addFavourites } = useContext(FavouritesContext);
  const { setNodeRef: setRemoveRef, isOver: isOverRemove } = useDroppable({ id: "remove" }); 

  function convertAddedToDate(added) {
    return new Date(`${added.month} ${added.day}, ${added.year}`);
  }
           
  function handleSearch() {
    const filtered = propertiesData.properties.filter((p) => {
      if (criteria.type && p.type !== criteria.type) return false;
      if (criteria.minPrice && p.price < criteria.minPrice) return false;
      if (criteria.maxPrice && p.price > criteria.maxPrice) return false;
      if (criteria.minBeds && p.bedrooms < criteria.minBeds) return false;
      if (criteria.maxBeds && p.bedrooms > criteria.maxBeds) return false;
      if (criteria.postcode && !p.location.toUpperCase().includes(criteria.postcode))
        return false;
      const addedDate = new Date(
      `${p.added.month} ${p.added.day}, ${p.added.year}`
    );
      const fromDate = criteria.dateFrom
        ? new Date(criteria.dateFrom)
        : null;
      const toDate = criteria.dateTo
        ? new Date(criteria.dateTo)
        : null;

      if (fromDate && addedDate < fromDate) return false;
      if (toDate && addedDate > toDate) return false;


      return true;
    });

    setResults(filtered);
  }

  function handleDragEnd(event) { 
    const { active, over } = event;

    if (!over) return;
    const draggedProperty = results.find((p) => p.id === active.id)
      || favourites.find(f => f.id === active.id); // ADDED: allow removing favourites

    if (!draggedProperty) return;

    if (over.id === "favourites") {
      const draggedProperty = results.find((p) => p.id === active.id);
      if (draggedProperty && !favourites.some((f) => f.id === draggedProperty.id)) {
        addFavourites(draggedProperty);
      }
    }

    if (over.id === "remove") { 
      if (favourites.some(f => f.id === draggedProperty.id)) {
        removeFavourites(draggedProperty.id);
      }
    }
  }

  return (
    <div className="search-page">
      <h2>Search Your Property</h2>

      <SearchForm criteria={criteria} setCriteria={setCriteria} onSearch={handleSearch} />

      <hr />

      {/*results*/}
       <DndContext onDragEnd={handleDragEnd}>

        <div className="results">
          {results.length === 0 && <p>No properties found.</p>}
          {results.map((property) => {
            const isFavourite = favourites.some(
              (fav) => fav.id === property.id
            );

            return(
              <DraggableProperty property={property} key={property.id}>
                <div className="property-card">
                  <div className="property-image">
                    <img
                      src={property.picture}
                      alt="property"
                      width="200"
                    />
                  
                  
                  <div className="property-info">  
            
                    <p><strong>{property.type}</strong></p>
                    <p>£{property.price.toLocaleString()}</p>
                    <p>{property.bedrooms} bedrooms</p>
                    <p>{property.location}</p>
                    <p>{property.shortDescription}</p> 
                   </div> 
                   </div>
                </div>  

              {/* ADD TO FAVOURITES */}
                <div className="property-actions">
                  <button
                    onClick={() => addFavourites(property)}
                    disabled={isFavourite}
                  >
                    {isFavourite
                      ? "Added to Favourites"
                      : "Add to Favourites"}
                  </button>

                {/* VIEW DETAILS */}
                  <Link to={`/property/${property.id}`}>
                    <button style={{ marginLeft: "10px" }}>
                      View Details
                    </button>
                  </Link>
                  
                </div> 
            </DraggableProperty>  
          );    
      })}
      </div>
      
      <hr/>
      {/* favourite list*/}
      <FavouritesList/>

      {/*Remove zone */}
        <div 
          ref={setRemoveRef} 
          className={`remove-zone ${isOverRemove ? "over-remove" : ""}`}
        >
           Drag here to remove from favourites
        </div>
      </DndContext>
      
    </div>
  );
}

export default SearchPage;

