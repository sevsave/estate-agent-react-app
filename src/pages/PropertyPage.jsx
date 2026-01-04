import React,{useState} from "react";
import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";


function PropertyPage() {
  const { id } = useParams();
  const { favourites,addFavourites } = useContext(FavouritesContext);

  const property = propertiesData.properties.find(
    (p) => p.id.toString() === id
  );
    
  
  if (!property) {
    return <p>Property not found</p>;
  }
  
  const [mainImage, setMainImage] = useState(property?.picture || "");
  const isFavourite = favourites.some(
    (fav)=>fav.id===property.id
  );

  return (
    <div className="property-page">
      <h2>{property.type}</h2>
      <p className="price">£{property.price.toLocaleString()}</p>
      <p className="location">{property.location}</p>

       {/* Favourite Button */}
      <button
        className="favourite-btn"
        onClick={() => addFavourites(property)}
        disabled={isFavourite}
      >
        {isFavourite ? "Added to Favourites" : "Add to Favourites"}
      </button>

      {/*  Main Image */}
      <div className="main-image">
        <img src={mainImage} alt="Main property" />
      </div>

      {/*  Thumbnails */}
      <div className="thumbnails">
        {property.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumbnail ${index + 1}`}
            className={img === mainImage ? "selected" : ""}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

      {/*  Tabs */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <img
            src={property.floorPlan}
            alt="Floor Plan"
            className="floor-plan"
          />
        </TabPanel>

        <TabPanel>
          {property.map ?(
            <iframe
            title="map"
            src={property.map}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
          ) :(
            <p>Map not available</p>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;
