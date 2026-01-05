import React from "react"; 
function PropertyCard({ property }) {
  return (
    <div className="property-card" >
      <div className="property-image">
        <img src={property.picture} alt={property.type} />
      </div> 
      <div> 
        <h3>{property.type}</h3>
        <p>{property.location}</p>
        <p>£{property.price.toLocaleString()}</p>
        <p>{property.bedrooms} bedrooms</p>
        <p>Date Added: {property.dateAdded}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
