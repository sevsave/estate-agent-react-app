function PropertyCard({ property }) {
  return (
    <div className="property-card" style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "5px" }}>
      <img 
        src={property.picture} 
        alt="property" 
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }} 
      />
      <h3>{property.type}</h3>
      <p>{property.location}</p>
      <p>£{property.price.toLocaleString()}</p>
      <p>{property.bedrooms} bedrooms</p>
      <p>Date Added: {property.dateAdded}</p>
    </div>
  );
}

export default PropertyCard;
