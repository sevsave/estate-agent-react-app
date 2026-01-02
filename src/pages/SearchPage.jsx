import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import propertiesData from "../data/properties.json";
import { Link } from "react-router-dom";
 

function SearchPage() {
  const [criteria, setCriteria] = useState({});
  const [results, setResults] = useState(propertiesData.properties);

  function handleSearch() {
    const filtered = propertiesData.properties.filter((p) => {
      if (criteria.type && p.type !== criteria.type) return false;
      if (criteria.minPrice && p.price < criteria.minPrice) return false;
      if (criteria.maxPrice && p.price > criteria.maxPrice) return false;
      if (criteria.minBeds && p.bedrooms < criteria.minBeds) return false;
      if (criteria.maxBeds && p.bedrooms > criteria.maxBeds) return false;
      if (criteria.postcode && !p.location.toUpperCase().includes(criteria.postcode))
        return false;
      if (criteria.dateFrom && new Date(p.added) < criteria.dateFrom) return false;
      if (criteria.dateTo && new Date(p.added) > criteria.dateTo) return false;

      return true;
    });

    setResults(filtered);
  }

  return (
    <div className="search-page">
      <h2>Property Search</h2>

      <SearchForm criteria={criteria} setCriteria={setCriteria} onSearch={handleSearch} />

      <hr />

      {/*results*/}

      <div className="results">
        {results.length === 0 && <p>No properties found.</p>}
        {results.map((property) => (
          <Link
              key={property.id}
              to={`/property/${property.id}`}
              className="property-link"
          >
            <div className="property-card">
              <img
                src={property.picture}
                alt="property"
                width="200"
              />
          
            <p><strong>{property.type}</strong></p>
            <p>£{property.price.toLocaleString()}</p>
            <p>{property.bedrooms} bedrooms</p>
            <p>{property.location}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
