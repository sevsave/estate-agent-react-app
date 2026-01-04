import React, { useState,useContext } from "react";
import SearchForm from "../components/SearchForm";
import propertiesData from "../data/properties.json";
import { Link } from "react-router-dom";
import FavouritesList from "../components/FavouritesList";
import { FavouritesContext } from "../context/FavouritesContext";
import './SearchPage.css'; 



function SearchPage() {
  const [criteria, setCriteria] = useState({});
  const [results, setResults] = useState(propertiesData.properties);
  const { favourites, addFavourites } = useContext(FavouritesContext);

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

  return (
    <div className="search-page">
      <h2>Search Your Property</h2>

      <SearchForm criteria={criteria} setCriteria={setCriteria} onSearch={handleSearch} />

      <hr />

      {/*results*/}

      <div className="results">
        {results.length === 0 && <p>No properties found.</p>}
        {results.map((property) => {
          const isFavourite = favourites.some(
            (fav) => fav.id === property.id
          );

          return(
            <div className="property-card" key = {property.id}>
              <div className="property-image">
                <img
                  src={property.picture}
                  alt="property"
                  width="200"
                />
              </div>
              <div className="property-info">  
          
                <p><strong>{property.type}</strong></p>
                <p>£{property.price.toLocaleString()}</p>
                <p>{property.bedrooms} bedrooms</p>
                <p>{property.location}</p>
                <p>{property.shortDescription}</p> 
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
          </div>
          );
          
      })}
      </div>
      <hr/>
      {/* favourite list*/}
      <FavouritesList/>
    </div>
  );
}

export default SearchPage;