import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";

function PropertyPage() {
  const { id } = useParams();

  const property = propertiesData.properties.find(
    (p) => p.id.toString() === id
  );

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{property.type}</h2>
      <p><strong>£{property.price.toLocaleString()}</strong></p>
      <p>{property.location}</p>

      {/* Main Image */}
      <img
        src={property.picture}
        alt="property"
        style={{ width: "100%", maxWidth: "600px" }}
      />

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
        {property.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="thumb"
            width="100"
          />
        ))}
      </div>

      <hr />

      <h3>Description</h3>
      <p>{property.description}</p>
    </div>
  );
}

export default PropertyPage;
